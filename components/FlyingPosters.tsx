import { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from 'ogl';

import './FlyingPosters.css';

const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;

float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                              0.0,                                0.0,                                1.0
    );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float qinticInOut(float t) {
  return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;
  
  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
  float localprogress = clamp(
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),
    0.,
    2.
  );
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;

  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;

  gl_FragColor = texture2D(tMap, uv);
}
`;

function AutoBind(self: any, { include, exclude }: any = {}) {
    const getAllProperties = (object: any): Set<[any, any]> => {
        const properties = new Set<[any, any]>();
        do {
            for (const key of Reflect.ownKeys(object)) {
                properties.add([object, key]);
            }
        } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
        return properties;
    };

    const filter = (key: any) => {
        const match = (pattern: any) => (typeof pattern === 'string' ? key === pattern : pattern.test(key));

        if (include) return include.some(match);
        if (exclude) return !exclude.some(match);
        return true;
    };

    for (const [object, key] of getAllProperties(self.constructor.prototype)) {
        if (key === 'constructor' || !filter(key)) continue;
        const descriptor = Reflect.getOwnPropertyDescriptor(object, key as any);
        if (descriptor && typeof descriptor.value === 'function') {
            self[key] = self[key].bind(self);
        }
    }
    return self;
}

function lerp(p1: number, p2: number, t: number) {
    return p1 + (p2 - p1) * t;
}

function map(num: number, min1: number, max1: number, min2: number, max2: number, round = false) {
    const num1 = (num - min1) / (max1 - min1);
    const num2 = num1 * (max2 - min2) + min2;
    return round ? Math.round(num2) : num2;
}

class Media {
    extra: number;
    gl: any;
    geometry: any;
    scene: any;
    screen: any;
    viewport: any;
    image: string;
    length: number;
    index: number;
    planeWidth: number;
    planeHeight: number;
    distortion: number;
    program: any;
    plane: any;
    padding: any;
    height: any;
    heightTotal: any;
    y: any;

    constructor({ gl, geometry, scene, screen, viewport, image, length, index, planeWidth, planeHeight, distortion }: any) {
        this.extra = 0;
        this.gl = gl;
        this.geometry = geometry;
        this.scene = scene;
        this.screen = screen;
        this.viewport = viewport;
        this.image = image;
        this.length = length;
        this.index = index;
        this.planeWidth = planeWidth;
        this.planeHeight = planeHeight;
        this.distortion = distortion;

        this.createShader();
        this.createMesh();
        this.onResize();
    }

    createShader() {
        const texture = new Texture(this.gl, {
            generateMipmaps: false
        });

        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            fragment: fragmentShader,
            vertex: vertexShader,
            uniforms: {
                tMap: { value: texture },
                uPosition: { value: 0 },
                uPlaneSize: { value: [0, 0] },
                uImageSize: { value: [0, 0] },
                uSpeed: { value: 0 },
                rotationAxis: { value: [0, 1, 0] },
                distortionAxis: { value: [1, 1, 0] },
                uDistortion: { value: this.distortion },
                uViewportSize: { value: [this.viewport.width, this.viewport.height] },
                uTime: { value: 0 }
            },
            cullFace: false
        });

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.image;
        img.onload = () => {
            texture.image = img;
            this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
        };
    }

    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        });
        this.plane.setParent(this.scene);
    }

    setScale() {
        this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;
        this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;

        this.plane.position.x = 0;
        this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
    }

    onResize({ screen, viewport }: any = {}) {
        if (screen) this.screen = screen;
        if (viewport) {
            this.viewport = viewport;
            this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height];
        }
        this.setScale();

        this.padding = 5;
        this.height = this.plane.scale.y + this.padding;
        this.heightTotal = this.height * this.length;

        this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;
    }


    update(scroll: any) {
        this.plane.position.y = this.y - scroll.current - this.extra;

        const position = map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);

        this.program.uniforms.uPosition.value = position;
        this.program.uniforms.uTime.value += 0.04;
        this.program.uniforms.uSpeed.value = scroll.current;
    }
}

class Canvas {
    container: any;
    canvas: any;
    items: any;
    planeWidth: any;
    planeHeight: any;
    distortion: any;
    scroll: any;
    cameraFov: any;
    cameraZ: any;
    renderer: any;
    gl: any;
    camera: any;
    scene: any;
    screen!: { width: any; height: any; };
    viewport: any;
    planeGeometry: any;
    medias: any[] = [];
    loaded: any;
    isDown: boolean = false;
    start: any;

    onActiveIndex: ((index: number) => void) | null = null;
    lastActiveIndex: number = -1;

    constructor({ container, canvas, items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ, onActiveIndex }: any) {
        this.container = container;
        this.canvas = canvas;
        this.items = items;
        this.planeWidth = planeWidth;
        this.planeHeight = planeHeight;
        this.distortion = distortion;
        this.onActiveIndex = onActiveIndex || null;
        this.scroll = {
            ease: scrollEase,
            current: 0,
            target: 0,
            last: 0
        };
        this.cameraFov = cameraFov;
        this.cameraZ = cameraZ;

        AutoBind(this);

        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();

        this.createGeometry();
        this.createMedias();

        // Start scroll at first poster
        const { min } = this.getScrollBounds();
        this.scroll.current = min;
        this.scroll.target = min;

        this.update();
        this.addEventListeners();
        this.createPreloader();
    }

    createRenderer() {
        this.renderer = new Renderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio, 2)
        });
        this.gl = this.renderer.gl;
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = this.cameraFov;
        this.camera.position.z = this.cameraZ;
    }

    createScene() {
        this.scene = new Transform();
    }

    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 1,
            widthSegments: 100
        });
    }

    createMedias() {
        this.medias = this.items.map((image: any, index: number) => {
            return new Media({
                gl: this.gl,
                geometry: this.planeGeometry,
                scene: this.scene,
                screen: this.screen,
                viewport: this.viewport,
                image,
                length: this.items.length,
                index,
                planeWidth: this.planeWidth,
                planeHeight: this.planeHeight,
                distortion: this.distortion
            });
        });
    }

    createPreloader() {
        this.loaded = 0;
        if (!this.items.length) return;

        this.items.forEach((src: string) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.src = src;
            image.onload = () => {
                this.loaded += 1;
                if (this.loaded === this.items.length) {
                    document.documentElement.classList.remove('loading');
                    document.documentElement.classList.add('loaded');
                }
            };
        });
    }

    onResize() {
        const rect = this.container.getBoundingClientRect();
        this.screen = {
            width: rect.width,
            height: rect.height
        };

        this.renderer.setSize(this.screen.width, this.screen.height);

        this.camera.perspective({
            aspect: this.gl.canvas.width / this.gl.canvas.height
        });

        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;

        this.viewport = { height, width };

        if (this.medias) {
            this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
        }
    }

    onTouchDown(e: any) {
        this.isDown = true;
        this.scroll.position = this.scroll.current;
        this.start = e.touches ? e.touches[0].clientY : e.clientY;
    }

    onTouchMove(e: any) {
        if (!this.isDown) return;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        const distance = (this.start - y) * 0.1;
        this.scroll.target = this.scroll.position + distance;
        this.clampScroll();
    }

    onTouchUp() {
        this.isDown = false;
    }

    getScrollBounds() {
        if (!this.medias || !this.medias.length) return { min: 0, max: 0 };
        const first = this.medias[0];
        const last = this.medias[this.medias.length - 1];
        // min = scroll so first poster is at center, max = scroll so last poster is at center
        const min = first.y;
        const max = last.y;
        return { min, max };
    }

    clampScroll() {
        const { min, max } = this.getScrollBounds();
        this.scroll.target = Math.max(min, Math.min(max, this.scroll.target));
    }

    isAtBound(direction: number): boolean {
        const { min, max } = this.getScrollBounds();
        const threshold = 0.01;
        if (direction > 0 && this.scroll.target >= max - threshold) return true;
        if (direction < 0 && this.scroll.target <= min + threshold) return true;
        return false;
    }

    onWheel(e: any) {
        const speed = e.deltaY;
        // If at bounds and trying to scroll past, let page handle it
        if (this.isAtBound(speed > 0 ? 1 : -1)) return false;
        this.scroll.target += speed * 0.02;
        this.clampScroll();
        return true; // consumed
    }

    update() {
        this.clampScroll();
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll));

            // Find poster closest to vertical center (y=0)
            if (this.onActiveIndex) {
                let closestIdx = 0;
                let closestDist = Infinity;
                this.medias.forEach((media: any, i: number) => {
                    const dist = Math.abs(media.plane.position.y);
                    if (dist < closestDist) {
                        closestDist = dist;
                        closestIdx = i;
                    }
                });
                if (closestIdx !== this.lastActiveIndex) {
                    this.lastActiveIndex = closestIdx;
                    this.onActiveIndex(closestIdx);
                }
            }
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;

        // Bind the callback properly so `this` context is not lost
        this.animationFrame = requestAnimationFrame(this.update.bind(this));
    }

    animationFrame = 0;

    addEventListeners() {
        window.addEventListener('resize', this.onResize);
        // Mouse/touch/wheel are added on the canvas element only, not window
    }

    destroy() {
        cancelAnimationFrame(this.animationFrame);

        window.removeEventListener('resize', this.onResize);
    }
}

const FlyingPosters = forwardRef(function FlyingPosters({
    items = [],
    planeWidth = 320,
    planeHeight = 320,
    distortion = 3,
    scrollEase = 0.01,
    cameraFov = 45,
    cameraZ = 20,
    className = '',
    onActiveIndex,
    ...props
}: any, ref: any) {
    const containerRef = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const instanceRef = useRef<any>(null);
    const onActiveIndexRef = useRef(onActiveIndex);
    onActiveIndexRef.current = onActiveIndex;

    const stableCallback = useCallback((idx: number) => {
        onActiveIndexRef.current?.(idx);
    }, []);

    // Expose onWheel to parent so it can forward wheel events from the whole section
    useImperativeHandle(ref, () => ({
        handleWheel(e: WheelEvent): boolean {
            if (!instanceRef.current) return false;
            return instanceRef.current.onWheel(e);
        },
        reset() {
            if (!instanceRef.current) return;
            const { min } = instanceRef.current.getScrollBounds();
            instanceRef.current.scroll.current = min;
            instanceRef.current.scroll.target = min;
        }
    }), []);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        instanceRef.current = new Canvas({
            container: containerRef.current,
            canvas: canvasRef.current,
            items,
            planeWidth,
            planeHeight,
            distortion,
            scrollEase,
            cameraFov,
            cameraZ,
            onActiveIndex: stableCallback
        });

        return () => {
            if (instanceRef.current) {
                instanceRef.current.destroy();
                instanceRef.current = null;
            }
        };
    }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ, stableCallback]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvasEl = canvasRef.current;

        const handleWheel = (e: WheelEvent) => {
            if (instanceRef.current) {
                const consumed = instanceRef.current.onWheel(e);
                if (consumed) e.preventDefault();
            }
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (instanceRef.current) instanceRef.current.onTouchDown(e);
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (instanceRef.current) instanceRef.current.onTouchMove(e);
        };
        const handleMouseUp = () => {
            if (instanceRef.current) instanceRef.current.onTouchUp();
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (instanceRef.current) instanceRef.current.onTouchDown(e);
        };
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            if (instanceRef.current) instanceRef.current.onTouchMove(e);
        };
        const handleTouchEnd = () => {
            if (instanceRef.current) instanceRef.current.onTouchUp();
        };

        canvasEl.addEventListener('wheel', handleWheel, { passive: false });
        canvasEl.addEventListener('mousedown', handleMouseDown);
        // mousemove/mouseup on window so dragging works even if cursor leaves canvas
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvasEl.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvasEl.addEventListener('touchend', handleTouchEnd);

        return () => {
            canvasEl.removeEventListener('wheel', handleWheel);
            canvasEl.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            canvasEl.removeEventListener('touchstart', handleTouchStart);
            canvasEl.removeEventListener('touchmove', handleTouchMove);
            canvasEl.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <div ref={containerRef} className={`posters-container ${className}`} {...props}>
            <canvas ref={canvasRef} className="posters-canvas" />
        </div>
    );
});

export default FlyingPosters;
