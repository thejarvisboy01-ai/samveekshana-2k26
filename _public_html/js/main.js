document.addEventListener('DOMContentLoaded', () => {
    // ---- Registration Form Logic ----
    const form = document.getElementById('registrationForm');
    const eventSelect = document.getElementById('event_type');
    const eventFeeText = document.getElementById('eventFeeText');
    const fileInput = document.getElementById('payment_screenshot');
    const fileText = document.querySelector('.file-upload-text span');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const SELECTED_EVENT_STORAGE_KEY = 'registration_selected_event';

    const EVENT_REGISTRATION_META = {
        TMB: { name: 'Tambola', slug: 'central-tambola', fee: 'Rs. 100/-' },
        T2T: { name: 'Trash 2 Tech', slug: 'central-trash-2-tech', fee: 'Rs. 100/- per team' },
        SLC: { name: 'Slow Cycling', slug: 'central-slow-cycling', fee: 'Rs. 50/-' },
        MCR: { name: 'Musical Chair', slug: 'central-musical-chair', fee: 'Rs. 50/-' },
        TLU: { name: 'Talent Unleash', slug: 'central-talent-unleash', fee: 'Rs. 50/-' },
        CTF: { name: 'Capture the Flag', slug: 'central-capture-the-flag', fee: 'Rs. 200/- per team' },
        VAL: { name: 'Valorant', slug: 'central-valorant', fee: 'Rs. 500/- per team' },
        EFB: { name: 'BGMI', slug: 'central-bgmi', fee: 'Rs. 200/- per team' },
        TRG: { name: 'Tech Rangoli', slug: 'central-tech-rangoli', fee: 'Rs. 50/-' },
        BBB: { name: 'Brainy Bunch Battle', slug: 'central-brainy-bunch-battle', fee: 'Rs. 100/- per team' },
        CV1: { name: 'Technical Quiz', slug: 'technical-quiz', fee: 'Rs. 50/- per team' },
        CV2: { name: 'Shut the Box', slug: 'shut-the-box', fee: 'Rs. 50/- per participant' },
        CV3: { name: 'Tambola', slug: 'tambola', fee: 'Rs. 50/- per participant' },
        ME1: { name: 'Future Ride', slug: 'future-ride', fee: 'Rs. 100/- per team' },
        ME2: { name: 'Navapravartan', slug: 'navapravartan', fee: 'Rs. 50/- per team' },
        EEE1: { name: 'Slow Cycling', slug: 'slow-cycling', fee: 'Rs. 50/-' },
        EEE2: { name: 'Techno Fusion', slug: 'techno-fusion', fee: 'Rs. 150/- per team' },
        EEE3: { name: 'Innovate to Elevate', slug: 'innovate-to-elevate', fee: 'Rs. 100/- per team' },
        CSE1: { name: 'UI/UX Redesigning', slug: 'ui-ux-redesigning', fee: 'Rs. 50/- per participant' },
        CSE2: { name: 'Blind Coding', slug: 'blind-coding', fee: 'Rs. 50/-' },
        CSE3: { name: 'Capture The Flag', slug: 'capture-the-flag', fee: 'Rs. 200/- per team' },
        BCA1: { name: 'Tech Rangoli', slug: 'tech-rangoli', fee: 'Rs. 50/-' },
        BCA2: { name: 'Pick and Speak', slug: 'pick-and-speak', fee: 'Rs. 50/-' },
        BCA3: { name: 'Face Painting', slug: 'face-painting', fee: 'Rs. 50/-' },
        ECE1: { name: 'Trash-2-Tech', slug: 'trash-2-tech', fee: 'Rs. 100/- per team' },
        ECE2: { name: 'Technological Innovation Coding', slug: 'technological-innovation-coding', fee: 'Rs. 100/- per team' },
        ECE3: { name: 'Brand Arena +', slug: 'brand-arena-plus', fee: 'Rs. 150/- per team' },
        AI1: { name: 'Escape Room', slug: 'escape-room', fee: 'Rs. 300/- per team' },
        AI2: { name: 'Tote Bag Painting', slug: 'tote-bag-painting', fee: 'Rs. 150/- per team' },
        CSBS1: { name: 'e-Game Football', slug: 'e-game-football', fee: 'Rs. 100/- per head' },
        CSBS2: { name: 'Roadies', slug: 'roadies', fee: 'Rs. 80/- per head' },
        CSBS3: { name: 'Pitch Tank', slug: 'pitch-tank', fee: 'Rs. 80/- per head' },
        BSH1: { name: 'BGMI', slug: 'bgmi', fee: 'Rs. 200/- per team' },
        BSH2: { name: 'Musical Chair', slug: 'musical-chair', fee: 'Rs. 50/-' }
    };

    const EVENT_GROUPS = [
        { label: 'Central Events', icon: 'fa-star', ids: ['TMB', 'T2T', 'SLC', 'MCR', 'TLU', 'CTF', 'VAL', 'EFB', 'TRG', 'BBB'] },
        { label: 'Civil Engineering', icon: 'fa-building-columns', ids: ['CV1', 'CV2', 'CV3'] },
        { label: 'Mechanical Engineering', icon: 'fa-gears', ids: ['ME1', 'ME2'] },
        { label: 'Electrical & Electronics', icon: 'fa-bolt', ids: ['EEE1', 'EEE2', 'EEE3'] },
        { label: 'Computer Science', icon: 'fa-laptop-code', ids: ['CSE1', 'CSE2', 'CSE3'] },
        { label: 'BCA / MCA', icon: 'fa-code', ids: ['BCA1', 'BCA2', 'BCA3'] },
        { label: 'Electronics & Communication', icon: 'fa-microchip', ids: ['ECE1', 'ECE2', 'ECE3'] },
        { label: 'AI & Data Science', icon: 'fa-brain', ids: ['AI1', 'AI2'] },
        { label: 'CSBS', icon: 'fa-chart-line', ids: ['CSBS1', 'CSBS2', 'CSBS3'] },
        { label: 'BSH', icon: 'fa-book-open', ids: ['BSH1', 'BSH2'] }
    ];
    const ADMIN_TABLE_COLUMN_COUNT = 8;

    function normalizeValue(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }

    function getEventByValue(value) {
        const normalized = normalizeValue(value);
        const key = Object.keys(EVENT_REGISTRATION_META).find((id) => {
            const event = EVENT_REGISTRATION_META[id];
            const normalizedName = normalizeValue(event.name);
            return (
                id === value ||
                event.slug === value ||
                normalizedName === normalized ||
                normalizedName.startsWith(normalized) ||
                normalized.startsWith(normalizedName)
            );
        });
        return key ? { id: key, ...EVENT_REGISTRATION_META[key] } : null;
    }

    function getEventSlugFromPath() {
        const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
        return path ? path.split('/')[0].toLowerCase() : '';
    }

    function getEventMetaById(eventId) {
        const id = String(eventId || '').trim();
        const event = EVENT_REGISTRATION_META[id];
        const group = EVENT_GROUPS.find((item) => item.ids.includes(id));

        if (!event) {
            return {
                id,
                name: id || 'Unknown Event',
                slug: '',
                fee: '',
                groupLabel: 'Unmapped Event',
                icon: 'fa-ticket'
            };
        }

        return {
            id,
            ...event,
            groupLabel: group ? group.label : 'Other Events',
            icon: group ? group.icon : 'fa-ticket'
        };
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatRegistrationDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return escapeHtml(value || '-');
        }

        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })}`;
    }

    function normalizeReceiptPath(path) {
        const value = String(path || '').trim();
        if (!value) return '';
        if (/^https?:\/\//i.test(value) || value.startsWith('/')) {
            return value;
        }
        return value.replace(/^\.?\//, '');
    }

    function isPdfFile(path) {
        return /\.pdf(?:$|[?#])/i.test(String(path || ''));
    }

    function filterRegistrationsByEvent(records, eventType) {
        if (eventType === 'all') {
            return records;
        }

        return records.filter((record) => {
            const resolvedEvent = getEventByValue(record.event_type || '');
            if (resolvedEvent) {
                return resolvedEvent.id === eventType;
            }

            return String(record.event_type || '').trim() === eventType;
        });
    }

    function updateFeeDisplay(selectedValue) {
        if (!eventFeeText) return;
        const event = getEventByValue(selectedValue || '');
        if (event) {
            eventFeeText.textContent = `${event.fee} (${event.name})`;
            return;
        }
        eventFeeText.textContent = 'Select an event to view the fee';
    }

    function populateEventSelect() {
        if (!eventSelect) return;
        while (eventSelect.options.length > 1) {
            eventSelect.remove(1);
        }

        EVENT_GROUPS.forEach((group) => {
            group.ids.forEach((id) => {
                const meta = EVENT_REGISTRATION_META[id];
                if (!meta) return;
                const option = document.createElement('option');
                option.value = id;
                option.textContent = `${group.label} | ${meta.name}`;
                eventSelect.appendChild(option);
            });
        });
    }

    function preselectEventFromContext() {
        if (!eventSelect) return;
        const params = new URLSearchParams(window.location.search);
        let eventFromStorage = '';
        try {
            eventFromStorage = sessionStorage.getItem(SELECTED_EVENT_STORAGE_KEY) || '';
            if (eventFromStorage) {
                sessionStorage.removeItem(SELECTED_EVENT_STORAGE_KEY);
            }
        } catch (_err) {
            eventFromStorage = '';
        }
        const eventFromQuery = params.get('event') || '';
        const slugFromPath = getEventSlugFromPath();
        const target = getEventByValue(eventFromStorage) || getEventByValue(eventFromQuery) || getEventByValue(slugFromPath);

        if (target) {
            eventSelect.value = target.id;
            updateFeeDisplay(target.id);
        } else {
            updateFeeDisplay('');
        }
    }

    if (eventSelect) {
        populateEventSelect();
        preselectEventFromContext();
        eventSelect.addEventListener('change', function () {
            updateFeeDisplay(this.value);
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', function (e) {
            if (this.files && this.files.length > 0) {
                fileText.textContent = this.files[0].name;
                fileText.style.color = '#fff';
            } else {
                fileText.textContent = 'Click to upload payment screenshot or drag and drop';
                fileText.style.color = '#94a3b8';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            btn.classList.add('loading');

            const formData = new FormData(form);

            try {
                const response = await fetch('process.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                showToast(result.message, result.status);

                if (result.status === 'success') {
                    form.reset();
                    if (fileText) {
                        fileText.textContent = 'Click to upload payment screenshot or drag and drop';
                        fileText.style.color = '#94a3b8';
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                showToast('An unexpected error occurred. Please try again.', 'error');
            } finally {
                btn.classList.remove('loading');
            }
        });
    }

    // Toast functionality
    function showToast(message, type) {
        if (!toast) return;
        toastMessage.textContent = message;
        toast.className = 'toast'; // Reset classes
        toast.classList.add(type);
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }


    // ---- Admin Dashboard Logic ----
    const adminNavMenu = document.getElementById('adminNavMenu');
    const tableBody = document.getElementById('tableBody');
    const currentEventTitle = document.getElementById('currentEventTitle');
    const currentEventSubtitle = document.getElementById('currentEventSubtitle');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalFrame = document.getElementById('modalFrame');
    const closeModal = document.querySelector('.modal-close');

    function setActiveAdminNavItem(item) {
        if (!adminNavMenu || !item) return;
        adminNavMenu.querySelectorAll('.nav-item.active').forEach((navItem) => {
            navItem.classList.remove('active');
        });
        item.classList.add('active');
    }

    function updateAdminHeader(item) {
        if (!item) return;

        const isAllRegistrations = item.dataset.event === 'all';
        const title = item.dataset.title || (isAllRegistrations ? 'All Registrations' : 'Event');
        const groupLabel = item.dataset.group || '';

        if (currentEventTitle) {
            currentEventTitle.textContent = isAllRegistrations ? title : `${title} Registrations`;
        }

        if (currentEventSubtitle) {
            currentEventSubtitle.textContent = isAllRegistrations
                ? 'Overview of student registrations across every event'
                : `${groupLabel} registrations`;
        }
    }

    function createAdminNavItem(meta, isActive) {
        const item = document.createElement('li');
        const icon = document.createElement('i');
        const label = document.createElement('span');

        item.className = `nav-item${isActive ? ' active' : ''}`;
        item.dataset.event = meta.id;
        item.dataset.title = meta.name;
        item.dataset.group = meta.groupLabel || '';

        icon.className = `fas ${meta.icon}`;
        label.textContent = meta.name;

        item.appendChild(icon);
        item.appendChild(label);
        return item;
    }

    function buildAdminNavigation() {
        if (!adminNavMenu) return;

        adminNavMenu.innerHTML = '';
        adminNavMenu.appendChild(createAdminNavItem({
            id: 'all',
            name: 'All Registrations',
            groupLabel: 'All Events',
            icon: 'fa-hdd'
        }, true));

        EVENT_GROUPS.forEach((group) => {
            const sectionTitle = document.createElement('li');
            sectionTitle.className = 'nav-section-title';
            sectionTitle.textContent = group.label;
            adminNavMenu.appendChild(sectionTitle);

            group.ids.forEach((eventId) => {
                adminNavMenu.appendChild(createAdminNavItem(getEventMetaById(eventId), false));
            });
        });
    }

    if (adminNavMenu && tableBody) {
        buildAdminNavigation();

        const initialItem = adminNavMenu.querySelector('.nav-item.active') || adminNavMenu.querySelector('.nav-item[data-event="all"]');
        if (initialItem) {
            updateAdminHeader(initialItem);
            fetchEventData(initialItem.dataset.event);
        }

        adminNavMenu.addEventListener('click', (event) => {
            const item = event.target.closest('.nav-item[data-event]');
            if (!item) return;

            setActiveAdminNavItem(item);
            updateAdminHeader(item);
            fetchEventData(item.dataset.event);
        });
    }

    async function fetchEventData(eventType) {
        if (!tableBody) return;

        tableBody.innerHTML = `<tr><td colspan="${ADMIN_TABLE_COLUMN_COUNT}" style="text-align:center;">Loading data...</td></tr>`;

        try {
            const response = await fetch('admin_api.php?event=all');
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 'success') {
                const registrations = Array.isArray(data.data) ? data.data : [];
                const filteredRegistrations = filterRegistrationsByEvent(registrations, eventType);

                renderTable(filteredRegistrations);

                const countElem = document.getElementById('totalCount');
                if (countElem) {
                    countElem.textContent = filteredRegistrations.length;
                }
            } else {
                tableBody.innerHTML = `<tr><td colspan="${ADMIN_TABLE_COLUMN_COUNT}" style="text-align:center; color:#ef4444;">${escapeHtml(data.message || 'Could not load registrations.')}</td></tr>`;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            tableBody.innerHTML = `<tr><td colspan="${ADMIN_TABLE_COLUMN_COUNT}" style="text-align:center; color:#ef4444;">Error fetching data. Check connection.</td></tr>`;
        }
    }

    function renderTable(data) {
        if (!tableBody) return;

        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="${ADMIN_TABLE_COLUMN_COUNT}" style="text-align:center; padding: 2rem; color: #64748b;">No registrations found for this event yet.</td></tr>`;
            return;
        }

        tableBody.innerHTML = data.map((row) => {
            const eventMeta = getEventMetaById(row.event_type);
            const receiptPath = normalizeReceiptPath(row.screenshot_path);
            const hasReceipt = Boolean(receiptPath);

            return `
                <tr>
                    <td>#${escapeHtml(row.id)}</td>
                    <td><strong>${escapeHtml(row.full_name || '-')}</strong></td>
                    <td>
                        <div class="event-cell">
                            <strong>${escapeHtml(eventMeta.name)}</strong>
                            <span class="event-group">${escapeHtml(eventMeta.groupLabel)}</span>
                        </div>
                    </td>
                    <td>${escapeHtml(row.email || '-')}</td>
                    <td>${escapeHtml(row.phone || '-')}</td>
                    <td><span style="font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">${escapeHtml(row.utr_number || '-')}</span></td>
                    <td>${formatRegistrationDate(row.created_at)}</td>
                    <td>
                        <button class="view-btn" type="button" ${hasReceipt ? `data-img="${escapeHtml(receiptPath)}"` : 'disabled'}>
                            <i class="fas ${hasReceipt ? 'fa-image' : 'fa-ban'}"></i> ${hasReceipt ? 'View Receipt' : 'No Receipt'}
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function closeReceiptModal() {
        if (!modal) return;

        modal.classList.remove('active');

        if (modalImg) {
            modalImg.hidden = true;
            modalImg.removeAttribute('src');
        }

        if (modalFrame) {
            modalFrame.hidden = true;
            modalFrame.src = 'about:blank';
        }
    }

    function openModal(assetPath) {
        const receiptPath = normalizeReceiptPath(assetPath);
        if (!modal || !receiptPath) return;

        if (modalImg) {
            modalImg.hidden = true;
            modalImg.removeAttribute('src');
        }

        if (modalFrame) {
            modalFrame.hidden = true;
            modalFrame.src = 'about:blank';
        }

        if (isPdfFile(receiptPath) && modalFrame) {
            modalFrame.hidden = false;
            modalFrame.src = receiptPath;
        } else if (modalImg) {
            modalImg.hidden = false;
            modalImg.src = receiptPath;
        } else {
            window.open(receiptPath, '_blank', 'noopener');
            return;
        }

        modal.classList.add('active');
    }

    if (tableBody) {
        tableBody.addEventListener('click', (event) => {
            const button = event.target.closest('.view-btn[data-img]');
            if (!button || button.disabled) return;
            openModal(button.dataset.img);
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', closeReceiptModal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeReceiptModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                closeReceiptModal();
            }
        });
    }
});
