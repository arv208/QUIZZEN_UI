$('#sectionModalEdit').on('shown.bs.modal', function(event){
    var button = $(event.relatedTarget);
    var section = button.data('section');
    
    var modal = $(this);
    modal.find('.modal-body input#sectionName').val(section);
});