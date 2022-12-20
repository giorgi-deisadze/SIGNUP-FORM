
function inputChanged(input) {
    input.setAttribute('input-filled', '1');
}

function checkForm(values) {
    // hide warnings
    document.querySelectorAll('.input-warning').forEach(function(el) {
        el.style.display = 'none';
    });

    /* check values */

    // firstname
    var formValidated = true;

    if(values.firstname.length < 2) {
        showWarning('nameWarning', 'Firstname is empty');

        formValidated = false;
    }

    // lastname
    if(values.lastname.length < 2) {
        showWarning('lnameWarning', 'Lastname is empty');

        formValidated = false;
    }

    // address
    if(values.address.trim().length == 0) {
        showWarning('addressWarning', 'Address is empty');

        formValidated = false;
    }

    return formValidated;
}

function showWarning(id, text) {
    var el = document.getElementById(id);
    el.innerText = text;
    el.style.display = 'block';
}

function uniqueId() {
    var unique_id = localStorage.getItem('unique-id');

    if(!unique_id) {
        localStorage.setItem('unique-id', 1);

        return 1;
    } else {
        localStorage.setItem('unique-id', parseInt(unique_id) + 1);

        return parseInt(unique_id) + 1;
    }
}

function userAdd(values) {
    // users database
    var users_db = localStorage.getItem('users');

    if(!users_db) {
        users_db = {};
    } else {
        users_db = JSON.parse(users_db);
    }
    
    // add new record
    users_db[uniqueId()] = values;

    // update database
    localStorage.setItem('users', JSON.stringify(users_db));
}

function userDelete(id){
    // confirm delete
    if(!confirm("Are you sure?")) {
        return false;
    }

    // delete record
    var users_db = localStorage.getItem('users');
    users_db = JSON.parse(users_db);
    delete users_db[id];
    localStorage.setItem('users', JSON.stringify(users_db));

    return true;
}

function tableCell(el, id, item) {
    var tr_elem = document.createElement('tr');

    // ID
    var td_elem = document.createElement('td');
    td_elem.innerText = id;
    tr_elem.appendChild(td_elem);

    // fields
    //item['notes'] = -1;

    Object.keys(item).forEach(function(key) {
        if(key !== 'notes') {
            var td_elem = document.createElement('td');
            td_elem.innerText = item[key];
            tr_elem.appendChild(td_elem);
        }
    });

    /* actions */
    // delete
    var td_elem = document.createElement('td');
    td_elem.innerHTML = '<button type="button" class="btn btn-danger">Delete</button>';
    td_elem.onclick = function() {
        // delete data
        if(userDelete(id)) {
            // delete row
            tr_elem.remove();
        }
    };
    tr_elem.appendChild(td_elem);

    // details
    var td_elem = document.createElement('td');
    td_elem.innerHTML = '<button type="button" class="btn btn-info">Details</button>';
    td_elem.onclick = function() {
        var dial = new Dialog(
            item.firstname+' '+item.lastname,
            '<div style="">'+
                '<div class="details-item">'+
                    '<b>ID:</b> '+id+
                '</div>'+
                '<div class="details-item">'+
                    '<b>Firstname:</b> '+item.firstname+
                '</div>'+
                '<div class="details-item">'+
                    '<b>Lastname:</b> '+item.lastname+
                '</div>'+
                '<div class="details-item">'+
                    '<b>Address:</b> '+item.address+
                '</div>'+
                '<div class="details-item">'+
                    '<b>Birthday:</b> '+item.birthday+
                '</div>'+
                '<div class="details-item">'+
                '<b>Gender:</b> '+item.gender+
                '</div>'+
                '<div class="details-item">'+
                '<b>Notes:</b> '+item.notes+
                '</div>'+
            '</div>',
            true
        );
        dial.open();
    };
    tr_elem.appendChild(td_elem);

    // add new tr
    el.appendChild(tr_elem);
}

function tableListing(el, db) {
    // reset table
    el.innerHTML = '';

    // users database
    var users_db = localStorage.getItem(db);

    if(!users_db) {
        return false;
    }

    users_db = JSON.parse(users_db);

    // listing items
    Object.keys(users_db).forEach(function(id) {
        tableCell(el, id, users_db[id]);
    });
}