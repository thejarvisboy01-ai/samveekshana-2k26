document.addEventListener('DOMContentLoaded', () => {
    // ---- Registration Form Logic ----
    const form = document.getElementById('registrationForm');
    const eventSelect = document.getElementById('event_type');
    const eventFeeText = document.getElementById('eventFeeText');
    const fileInput = document.getElementById('payment_screenshot');
    const fileText = document.querySelector('.file-upload-text span');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    const EVENT_REGISTRATION_META = {
        CV1: { name: 'Technical Quiz', slug: 'technical-quiz', fee: 'Rs. 100' },
        CV2: { name: 'Shut the box', slug: 'shut-the-box', fee: 'Rs. 100' },
        ME1: { name: 'Future Ride', slug: 'future-ride', fee: 'Rs. 100' },
        ME2: { name: 'Navapravartan', slug: 'navapravartan', fee: 'Rs. 100' },
        EEE1: { name: 'Innovate to Elevate', slug: 'innovate-to-elevate', fee: 'Rs. 100' },
        EEE2: { name: 'Techno Fusion', slug: 'techno-fusion', fee: 'Rs. 100' },
        CSE1: { name: 'Blind Coding', slug: 'blind-coding', fee: 'Rs. 100' },
        CSE2: { name: 'UI UX Redesign', slug: 'ui-ux-redesign', fee: 'Rs. 100' },
        BCA1: { name: 'Face Painting', slug: 'face-painting', fee: 'Rs. 100' },
        BCA2: { name: 'Pick and Speak', slug: 'pick-and-speak', fee: 'Rs. 100' },
        ECE1: { name: 'Brand Arena +', slug: 'brand-arena-plus', fee: 'Rs. 100' },
        ECE2: { name: 'Technological Innovation Coding', slug: 'technological-innovation-coding', fee: 'Rs. 100' },
        AI1: { name: 'Escape Room', slug: 'escape-room', fee: 'Rs. 100' },
        AI2: { name: 'Totebag Painting', slug: 'totebag-painting', fee: 'Rs. 100' },
        CSBS1: { name: 'Pitch Tank', slug: 'pitch-tank', fee: 'Rs. 100' },
        CSBS2: { name: 'Roadies', slug: 'roadies', fee: 'Rs. 100' },
        BSH1: { name: 'BGMI', slug: 'bgmi', fee: 'Rs. 100' },
        BSH2: { name: 'Bigboss', slug: 'bigboss', fee: 'Rs. 100' }
    };

    const EVENT_GROUPS = [
        { label: 'Civil Engineering', ids: ['CV1', 'CV2'] },
        { label: 'Mechanical Engineering', ids: ['ME1', 'ME2'] },
        { label: 'Electrical & Electronics', ids: ['EEE1', 'EEE2'] },
        { label: 'Computer Science', ids: ['CSE1', 'CSE2'] },
        { label: 'BCA / MCA', ids: ['BCA1', 'BCA2'] },
        { label: 'Electronics & Communication', ids: ['ECE1', 'ECE2'] },
        { label: 'AI & Data Science', ids: ['AI1', 'AI2'] },
        { label: 'CSBS', ids: ['CSBS1', 'CSBS2'] },
        { label: 'BSH', ids: ['BSH1', 'BSH2'] }
    ];

    function getEventByValue(value) {
        const key = Object.keys(EVENT_REGISTRATION_META).find((id) => {
            const event = EVENT_REGISTRATION_META[id];
            return id === value || event.slug === value || event.name.toLowerCase() === value.toLowerCase();
        });
        return key ? { id: key, ...EVENT_REGISTRATION_META[key] } : null;
    }

    function getEventSlugFromPath() {
        const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
        return path ? path.split('/')[0].toLowerCase() : '';
    }

    function updateFeeDisplay(selectedValue, feeOverride) {
        if (!eventFeeText) return;
        const event = getEventByValue(selectedValue || '');
        if (event) {
            eventFeeText.textContent = `${feeOverride || event.fee} (${event.name})`;
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
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.label;

            group.ids.forEach((id) => {
                const meta = EVENT_REGISTRATION_META[id];
                if (!meta) return;
                const option = document.createElement('option');
                option.value = id;
                option.textContent = `${meta.name} (${meta.fee})`;
                optgroup.appendChild(option);
            });

            eventSelect.appendChild(optgroup);
        });
    }

    function preselectEventFromUrl() {
        if (!eventSelect) return;
        const params = new URLSearchParams(window.location.search);
        const eventFromQuery = params.get('event') || '';
        const feeFromQuery = params.get('fee') || '';
        const slugFromPath = getEventSlugFromPath();
        const target = getEventByValue(eventFromQuery) || getEventByValue(slugFromPath);

        if (target) {
            eventSelect.value = target.id;
            updateFeeDisplay(target.id, feeFromQuery);
        } else {
            updateFeeDisplay('');
        }
    }

    if (eventSelect) {
        populateEventSelect();
        preselectEventFromUrl();
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
    const navItems = document.querySelectorAll('.nav-item[data-event]');
    const tableBody = document.getElementById('tableBody');
    const currentEventTitle = document.getElementById('currentEventTitle');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal-close');

    if (navItems.length > 0) {
        // Load initially active event
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) {
            fetchEventData(activeItem.dataset.event);
        }

        navItems.forEach(item => {
            item.addEventListener('click', function () {
                // Update active state
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                // Fetch data for clicked event
                const eventName = this.dataset.event;
                const displayEventName = this.querySelector('span').textContent;

                if (currentEventTitle) {
                    currentEventTitle.textContent = displayEventName + " Registrations";
                }

                fetchEventData(eventName);
            });
        });
    }

    async function fetchEventData(eventType) {
        if (!tableBody) return;

        tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Loading data...</td></tr>';

        try {
            const response = await fetch(`admin_api.php?event=${encodeURIComponent(eventType)}`);
            const data = await response.json();

            if (data.status === 'success') {
                renderTable(data.data);

                // Update quick stats if available
                const countElem = document.getElementById('totalCount');
                if (countElem) {
                    countElem.textContent = data.data.length;
                }
            } else {
                tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#ef4444;">${data.message}</td></tr>`;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#ef4444;">Error fetching data. Check connection.</td></tr>`;
        }
    }

    function renderTable(data) {
        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2rem; color: #64748b;">No registrations found for this event yet.</td></tr>';
            return;
        }

        tableBody.innerHTML = '';
        data.forEach((row, index) => {
            const tr = document.createElement('tr');

            // Format date nicely
            const dateObj = new Date(row.created_at);
            const dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            tr.innerHTML = `
                <td>#${row.id}</td>
                <td><strong>${row.full_name}</strong></td>
                <td>${row.email}</td>
                <td>${row.phone}</td>
                <td><span style="font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">${row.utr_number}</span></td>
                <td>${dateStr}</td>
                <td>
                    <button class="view-btn" data-img="${row.screenshot_path}">
                        <i class="fas fa-image"></i> View Receipt
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Add listeners to view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const imgSrc = this.dataset.img;
                openModal(imgSrc);
            });
        });
    }

    function openModal(imgSrc) {
        if (!modal || !modalImg) return;
        modalImg.src = imgSrc;
        modal.classList.add('active');
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});
