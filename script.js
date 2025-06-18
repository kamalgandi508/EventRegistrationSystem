let currentEvent = '';
const registrations = [];

const eventNames = {
    volleyball: ' Volleyball Championship Registration',
    basketball: ' Basketball Tournament Registration',
    cricket: '    Cricket Championship Registration',
    badminton: ' Badminton Tournament Registration'
};

function openModal(eventName) {
    currentEvent = eventName;
    const modal = document.getElementById('registrationModal');
    const modalTitle = document.getElementById('modalTitle');

    modalTitle.textContent = eventNames[eventName];
    modal.style.display = 'flex';

    document.getElementById('registrationForm').reset();
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
}

function closeModal() {
    document.getElementById('registrationModal').style.display = 'none';
}

function validateContactNumber(number) {
    return /^[0-9]{10}$/.test(number);
}

function isDuplicateRegistration(roll, event) {
    return registrations.some(entry =>
        entry.rollNumber === roll && entry.event === event
    );
}

function handleFormSubmission(e) {
    e.preventDefault();

    const formData = {
        event: currentEvent,
        studentName: document.getElementById('studentName').value.trim(),
        rollNumber: document.getElementById('rollNumber').value.trim().toUpperCase(),
        branch: document.getElementById('branch').value,
        year: document.getElementById('year').value,
        contactNumber: document.getElementById('contactNumber').value.trim(),
        registrationDate: new Date().toLocaleString()
    };

    if (!validateContactNumber(formData.contactNumber)) {
        alert('Please enter a valid 10-digit contact number.');
        document.getElementById('contactNumber').focus();
        return;
    }

    if (isDuplicateRegistration(formData.rollNumber, currentEvent)) {
        alert('You have already registered for this event!');
        return;
    }

    registrations.push(formData);

    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';

    console.log('🎉 New Registration:', formData);
    console.log('Total Registrations:', registrations.length);
    console.log('All Current Registrations:', registrations);

    setTimeout(closeModal, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registrationForm').addEventListener('submit', handleFormSubmission);

    window.addEventListener('click', event => {
        const modal = document.getElementById('registrationModal');
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON' && e.target.type !== 'submit') {
            e.preventDefault();
        }
    });

    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    document.getElementById('rollNumber').addEventListener('input', e => {
        e.target.value = e.target.value.toUpperCase();
    });

    document.getElementById('contactNumber').addEventListener('input', e => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    });

    document.getElementById('studentName').addEventListener('blur', e => {
        const name = e.target.value.toLowerCase().split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        e.target.value = name;
    });
});

function getEventRegistrations(name) {
    return registrations.filter(entry => entry.event === name);
}

function getTotalRegistrations() {
    return registrations.length;
}

function getRegistrationsByBranch(branch) {
    return registrations.filter(entry => entry.branch === branch);
}

function getRegistrationsByYear(year) {
    return registrations.filter(entry => entry.year === year);
}

function exportRegistrations() {
    if (registrations.length === 0) {
        alert('No registrations found to export!');
        return;
    }

    const csv = "data:text/csv;charset=utf-8," +
        "Event,Student Name,Roll Number,Branch,Year,Contact Number,Registration Date\n" +
        registrations.map(r =>
            `${r.event},"${r.studentName}",${r.rollNumber},${r.branch},${r.year},${r.contactNumber},"${r.registrationDate}"`
        ).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "svec_sports_registrations.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Registration data exported to svec_sports_registrations.csv");
}

function searchRegistration(roll) {
    const term = roll.toLowerCase();
    return registrations.filter(entry =>
        entry.rollNumber.toLowerCase().includes(term)
    );
}

console.log(`
🏆 Sports Registration System - Admin Commands:
- getTotalRegistrations()
- getEventRegistrations('event')
- getRegistrationsByBranch('branch')
- getRegistrationsByYear('year')
- searchRegistration('rollNumber')
- exportRegistrations()
- registrations
Available: volleyball, basketball, cricket, badminton
Branches: CSE, ECE, EEE, MECH, CIVIL, IT
Years: 1, 2, 3, 4
`);

function debounce(fn, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), wait);
    };
}
