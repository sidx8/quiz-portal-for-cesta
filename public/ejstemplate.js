$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

$(document).ready(()=>{
    $("#form1").submit( (e)=>{
        e.preventDefault();
        var counter=0;
        for(var x=0;x<30;x++)
        {
            if($("#answer"+(x+1)+":checked").val()==1)
                counter++;
        }
        console.log(counter);
        ajax_call(counter)
    });
});


$(document).ready(()=>{
    $("#form2").submit( (e)=>{
        e.preventDefault();
        var counter=0;
        for(var x=0;x<25;x++)
        {
            if($("#answer"+(x+1)+":checked").val()==1)
                counter++;
        }
        console.log(counter);
        ajax_call(counter);
    });
});

function ajax_call(counter)
{
    $.ajax({
        url: '/submit',
        data :{
            teamName: $('#teamName').val(),
            points: counter
        },
        method: "POST",
        success : function(data){
            window.location.replace(data.link);
        },
        error:function(err){
            alert(JSON.stringify(err.responseText));
        }
    }); 
}