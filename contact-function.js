const saveContacts = function (contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts))
}

const getSavedContacts = function () {
    const contactsJSON = localStorage.getItem('contacts')
    if (contactsJSON !== null) {
        return JSON.parse(contactsJSON)
    } else {
        return []
    }
}

const generateDOM = function (contact, index) {
    const tr = document.createElement('tr')
    const th = document.createElement('th')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')
    const removeButton = document.createElement('button')
    th.setAttribute('scope', 'row')
    th.textContent = index + 1
    td1.textContent = contact.name
    td2.textContent = contact.email
    td3.textContent = contact.mobile
    removeButton.setAttribute('class', 'btn btn-outline-danger btn-sm')
    removeButton.textContent = 'Delete'
    td4.appendChild(removeButton)
    removeButton.addEventListener('click', function (e) {
        contacts = contacts.filter(function (c) {
            return c.mobile !== contact.mobile
        })
        saveContacts(contacts)
        renderContacts(contacts, filters)
    })

    tr.appendChild(th)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tbody.appendChild(tr)
    closeForm()
}

const auth = function (e) {
    if (e.target.elements.name.value.length < 3) {
        document.querySelector('#error-message').setAttribute('class', 'alert alert-warning alert-dismissible fade show')
        const a = document.querySelector('strong').textContent = 'Name is to short!!'
        return false
    } else if (e.target.elements.name.value.length > 20) {
        document.querySelector('#error-message').setAttribute('class', 'alert alert-warning alert-dismissible fade show')
        const a = document.querySelector('strong').textContent = 'Name is to Long!!'
        return false
    } else if (e.target.elements.contact.value.length !== 11) {
        document.querySelector('#error-message').setAttribute('class', 'alert alert-warning alert-dismissible fade show')
        const a = document.querySelector('strong').textContent = 'Invalid Mobile number!!'
        return false
    } else if (true) {
        const temp = [e.target.elements.contact.value.slice(0, 4), '-', e.target.elements.contact.value.slice(4)].join('')
        let check = contacts.findIndex(function (contact) {
            return temp === contact.mobile
        })
        if (check > -1) {
            document.querySelector('#error-message').setAttribute('class', 'alert alert-warning alert-dismissible fade show')
            const a = document.querySelector('strong').textContent = 'Number already exists!!'
            return false
        } else {
            return true
        }
    }
}

const renderContacts = function (contacts, filters) {
    const filteredContacts = contacts.filter(function (contact) {
        return contact.name.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    tbody.innerHTML = ''
    filteredContacts.forEach(function (contact, index) {
        generateDOM(contact, index)
    })
}