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
        entryText: text
    }

    if(localStorage.getItem('entries')==null){
        let entries = [];
        entries.unshift(entry);
        localStorage.setItem('entries',JSON.stringify(entries));
    }else{
        let entries = JSON.parse(localStorage.getItem('entries'));
        entries.unshift(entry);
        localStorage.setItem('entries',JSON.stringify(entries));
    }

    document.getElementById('entryInputForm').reset();

    showAllEntries();

    e.preventDefault();
}

function showAllEntries(){
    if(localStorage.getItem('entries')!=null){
        let entries = JSON.parse(localStorage.getItem('entries'));
        let entryList = document.getElementById('entryList');
        entryList.innerHTML = '';
        for(let i=0; i<entries.length;i++){
            let id = entries[i].entryID;
            let title = entries[i].entryTitle;
            let date = entries[i].entryDate;
            let text = entries[i].entryText;

            entryList.innerHTML += '<div class="col-6 mt-3"><p class="h4">'+ title +'</p></div>'+
                '<div class="col-6"><p class="text-secondary">'+ date +'</p></div>'+
                '<div class="col-12"><p>'+ text +'</p></div>';
        }
        console.log("finisched");
    }

}