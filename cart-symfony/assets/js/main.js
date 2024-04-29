$(document).ready(function () {
    $('#convert').keyup(function (){
        let count = $('#convert').val()*15
        $('#price').val(count)
    })
    $('.cart-detail').on('click', function(){
        let id = this.data('value')
        console.log(id)
    })
    $('#addCart').on('click', function (){
        $()
    })
})
