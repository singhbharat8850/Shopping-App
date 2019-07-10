$("document").ready(function() {
    sessionStorage.removeItem('currentProductId');

    $('#add-product').on('submit', function(event){
        event.preventDefault();

        var productName = $('#product-name').val();
        var productCategory = $('#product-category').val();
        var productPrice = $('#product-price').val();
        var productDescription = $('#product-description').val();

        if( sessionStorage.getItem('currentProductId') != null) {
            var id = sessionStorage.getItem('currentProductId');
            var url = "https://api.mlab.com/api/1/databases/shopping-app/collections/products/" + id + "?apiKey=UHnVJJl--aPfvjDlGLVNsFvbeysWuSbG"; 
            var type = "PUT";
        }
        else {
            var url = "https://api.mlab.com/api/1/databases/shopping-app/collections/products?apiKey=UHnVJJl--aPfvjDlGLVNsFvbeysWuSbG";           
            var type = "POST";
        }
        
        $.ajax({ 
            url: url,
            data: JSON.stringify({ 
                "productName" : productName,
                "productCategory" : productCategory,
                "productPrice" : productPrice,
                "productDescription" : productDescription
            }),
            type: type,
            contentType: "application/json",
            success : function(data){
                window.location.href="/"
            },
            error: function(xhr, status, err) {
                console.log(err)
            }
        });
    });

    $('body').on('click', '#update-product', function(event){
        event.preventDefault();
        sessionStorage.setItem('currentProductId', $(this).data('id'));

        $('#product-name').val($(this).data('name'));
        $('#product-category').val($(this).data('category'));
        $('#product-price').val($(this).data('price'));
        $('#product-description').val($(this).data('description'));
        $('#the-button').val('Update Product');  
    });

    $('body').on('click', '#delete-product', function(event){
        event.preventDefault();

        var id = $(this).data('id');
        var url = "https://api.mlab.com/api/1/databases/shopping-app/collections/products/" + id + "?apiKey=UHnVJJl--aPfvjDlGLVNsFvbeysWuSbG"; 
        var type = "DELETE";

        $.ajax({ 
            url: url,
            type: type,
            async: true,
            timeout: 300000,
            success : function(data){
                window.location.href="/"
            },
            error: function(xhr, status, err) {
                console.log(err)
            }
        });
    });
});

function getProducts() {
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/shopping-app/collections/products?apiKey=UHnVJJl--aPfvjDlGLVNsFvbeysWuSbG"
    }).done(function(data){
        var output ='';
        if(!$.trim(data)) {
            output = `
            <div class="mdl-cell mdl-cell--2-col"></div>
            <div class="mdl-cell mdl-cell--8-col">
                <h5>
                    Sorry, your product list is empty.<br/>
                    Please add some products to see things here.    
                </h5>
            </div>
            <div class="mdl-cell mdl-cell--2-col"></div>
            `;
        }
        else {
            $.each(data, function(key, data){
                output += `
                <div class="mdl-cell mdl-cell--2-col"></div>
                <div class="mdl-cell mdl-cell--8-col">
                    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                        <div class="mdl-card__title">
                            <h2 class="mdl-card__title-text">` + data.productName + `</h2>
                        </div>
                        <div class="mdl-card__supporting-text">` + data.productDescription + `
                        </div>
                        <div class="mdl-card__actions">
                            <span class="mdl-chip mdl-chip--contact">
                                <span class="mdl-chip__contact mdl-color--indigo mdl-color-text--white"><span class="fa fa-rupee fa-2x"></span></span>
                                <span class="mdl-chip__text">` + data.productPrice + `</span>
                            </span>    
                            <span class="mdl-chip">
                                <span class="mdl-chip__text">` + data.productCategory + `
                                </span>
                            </span>                
                        </div>
                        <div class="mdl-card__actions mdl-card--border">
                            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                            id="update-product" href="" data-id="` + data._id.$oid + `" data-name="` + data.productName + `" data-category="` + data.productCategory + `" data-price="` + data.productPrice + `" data-description="` + data.productDescription + `">
                                Update
                            </a>
                            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                            id="delete-product" href="" data-id="` + data._id.$oid + `">
                            Delete
                            </a>
                        </div>
                    </div>
                </div>
                <div class="mdl-cell mdl-cell--2-col"></div>`;
            });
        }
        $("#product-list").html(output);
    });
}
