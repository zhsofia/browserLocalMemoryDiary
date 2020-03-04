document.getElementById('diaryInputForm').addEventListener('submit',saveEntry);

function saveEntry(e){
    let id = chance.guid();
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let text = document.getElementById('the_input').value;

    let entry = {
        entryID: id,
        entryTitle: title,
        entryDate: date,
        entryText: text,
        entryCoolness: false
    }

    if(localStorage.getItem('entries')==null){
        const entries = [];
        entries.unshift(entry);
        localStorage.setItem('entries',JSON.stringify(entries));
    }else{
        const entries = JSON.parse(localStorage.getItem('entries'));
        entries.unshift(entry);
        localStorage.setItem('entries',JSON.stringify(entries));
    }

    document.getElementById('entryInputForm').reset();

    showAllEntries();

    e.preventDefault();
}

function coolFunc(index){
    const entries = JSON.parse(localStorage.getItem('entries'));
    entries[index].entryCoolness=true;
    localStorage.setItem('entries',JSON.stringify(entries));
    showAllEntries();
}

function deleteFunc(index){
    const entries = JSON.parse(localStorage.getItem('entries'));
    entries.splice(index,1);
    localStorage.setItem('entries',JSON.stringify(entries));
    showAllEntries();
}

function showAllEntries(){
    if(localStorage.getItem('entries')!=null){
        let entries = JSON.parse(localStorage.getItem('entries'));
        let entryList = document.getElementById('entryList');
        entryList.innerHTML = '';
        for(let i=0; i<entries.length;i++){
            let {entryID:id, entryTitle:title, entryDate:date, entryText:text}=entries[i];
            let del='delete';
            let cool='cool';
            let coolness='';
            let check = document.getElementById('newEntry').innerText;
            if(check==='Neuer Eintrag'){
                del='Löschen';
                cool='Cool!';
            }else if(check==='Новий запис'){
                del='Видалити';
                cool='Круто!';
            }

            if(entries[i].entryCoolness){
                coolness='<span class="badge badge-success">Cool!</span>';
            }

            entryList.innerHTML += '<div class="row my-4">'+
                '<div class="col-6 "><p class="h4">'+ title+ ' ' +coolness +'</p></div>'+
                '<div class="col-6 text-right"><p class="text-secondary">'+ date +'</p></div>'+
                '<div class="col-12"><p>'+ text +'</p></div>' +
                '<div class="col-lg-1 mr-2 my-1 col-sm-4 col-xs-6"><div><button onclick="coolFunc(\'' + i + '\')" class="btn btn-success btn-sm">'+ cool + '</button></div></div>'+
                '<div class="col-lg-1 mr-2 my-1 col-sm-4 col-xs-6"><div><button onclick="deleteFunc(\'' + i + '\')" class="btn btn-danger btn-sm">'+ del + '</button></div></div>' +
                '</div>';
        }
    }


}

