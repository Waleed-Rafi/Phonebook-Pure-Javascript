let contacts = getSavedContacts()
const filters = {
    searchText: ''
}
const tbody = document.querySelector('#contact-list')
const save = document.querySelector('#save-form')
const filterContacts = document.querySelector('#filter-contacts')

renderContacts(contacts, filters)

save.addEventListener('submit', function (e) {
    e.preventDefault()
    const valid = auth(e)
    if (valid) {
        contacts.push({
            name: e.target.elements.name.value,
            email: e.target.elements.email.value,
            mobile: [e.target.elements.contact.value.slice(0, 4), '-', e.target.elements.contact.value.slice(4)].join('')
        })
        saveContacts(contacts)
        renderContacts(contacts, filters)
        e.target.elements.name.value = ''
        e.target.elements.email.value = ''
        e.target.elements.contact.value = ''
    }
})

filterContacts.addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderContacts(contacts, filters)
})

//opening and closing form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.querySelector('#error-message').setAttribute('class', 'alert alert-success alert-dismissible fade show')
    const a = document.querySelector('strong').textContent = 'Create your contacts'
    document.getElementById("myForm").style.display = "none";
}