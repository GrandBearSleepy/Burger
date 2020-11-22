
$(function () {
  //Click event for adding a burger.
  $('.add-form').on('submit', function (event) {

    event.preventDefault();


    let newBurger = {
      burger_name: $('#burger-form').val().trim(),
      devoured: 0
    };


    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    }).then(
      function () {
        location.reload();
      }
    );
  });


  $('.delete-burger').on('click', function (event) {
    let id = $(this).data('id');


    $.ajax('/api/burgers/' + id, {
      type: 'DELETE',
    }).then(
      function () {

        location.reload();
      }
    );
  });


  $('.change-devour').on('click', function (event) {
    let id = $(this).data('id');
    let devour = {
      devoured: 'true'
    };

    $.ajax('/api/burgers/' + id, {
      type: 'PUT',
      data: devour
    }).then(
      function () {

        location.reload();
      }
    );
  });
});
