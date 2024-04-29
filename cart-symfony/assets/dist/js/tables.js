$(document).ready(function () {
    let table = $("#organizations");
    let url = $(table).data('url');
    let locale = $(table).data('locale');
    let hy = $(table).data('languageHy');
    let en = $(table).data('languageEn');
    let ru = $(table).data('languageRu');
    let currentLocale = hy;

    switch (locale){
        case 'hy': currentLocale = hy; break;
        case 'en': currentLocale = en; break;
    }
    let dataTable = $('#organizations').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'print','copy', 'csv','excel'
        ],
        "responsive":true,
        "language": {
            "url": currentLocale
        },
        "processing": true,
        "search": {
            "regex": true
        },
        "serverSide": true,
        "ajax": {
            "url": url,
            "type": "GET",
            "data": {
                "locale": locale
            }
        },
        "columns": [
            { "name":"name","data": "name" },
            { "name":"tin","data": "tin" },
            { "name":"manager","data": "manager" },
            { "name":"phone","data": "phone" },
            { "name":"email","data": "email" },
            { "name":"activity","data": "activity" },
            { "name":"edit","data": "edit" },
            { "name":"delete","data": "delete" },
        ]
    });

});

