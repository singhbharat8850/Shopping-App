$('document').ready(function() {
    var inCart = [];
    var totalSum = 0;
    var output = '';

    $('body').on('click', '#add-to-cart', function(event){
        
        event.preventDefault();
        var thisProduct = {
            productId: $(this).data('id'),
            productName: $(this).data('name'),
            productCategory: $(this).data('category'),
            productPrice: $(this).data('price'),
            productDescription: $(this).data('description')
        };

        inCart.push(thisProduct);
        output = '';
        totalSum = 0;

        $('#my-cart-list').html('');

        for (var i = 0; i < inCart.length; i++) {
            totalSum += inCart[i].productPrice;
            output += `
            <div class="mdl-cell mdl-cell--2-col"></div>
            <div class="mdl-cell mdl-cell--8-col">
                <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">` + inCart[i].productName + `</h2>
                    </div>
                    <div class="mdl-card__supporting-text">` + inCart[i].productDescription + `
                    </div>
                    <div class="mdl-card__actions">
                        <span class="mdl-chip mdl-chip--contact">
                            <span class="mdl-chip__contact mdl-color--indigo mdl-color-text--white"><span class="fa fa-rupee fa-2x"></span></span>
                            <span class="mdl-chip__text">` + inCart[i].productPrice + `</span>
                        </span>    
                        <span class="mdl-chip">
                            <span class="mdl-chip__text">` + inCart[i].productCategory + `
                            </span>
                        </span>                
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                        id="remove-from-cart" href="" data-id="` + inCart[i].productId + `">
                            Remove from Cart
                        </a>
                    </div>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--2-col"></div>`;
        }
        
        $('#my-cart-list').html(output);
    });

    $('body').on('click', '#remove-from-cart', function(event){
        event.preventDefault();
        
        for(var i = 0; i < inCart.length; i++) {
            if(inCart[i].productId == $(this).data('id')) {
                totalSum -= inCart[i].productPrice;
                inCart.splice(i, 1);
            }
        }

        output = '';

        for (var i = 0; i < inCart.length; i++) {
            output += `
            <div class="mdl-cell mdl-cell--2-col"></div>
            <div class="mdl-cell mdl-cell--8-col">
                <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">` + inCart[i].productName + `</h2>
                    </div>
                    <div class="mdl-card__supporting-text">` + inCart[i].productDescription + `
                    </div>
                    <div class="mdl-card__actions">
                        <span class="mdl-chip mdl-chip--contact">
                            <span class="mdl-chip__contact mdl-color--indigo mdl-color-text--white"><span class="fa fa-rupee fa-2x"></span></span>
                            <span class="mdl-chip__text">` + inCart[i].productPrice + `</span>
                        </span>    
                        <span class="mdl-chip">
                            <span class="mdl-chip__text">` + inCart[i].productCategory + `
                            </span>
                        </span>                
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                        id="remove-from-cart" href="" data-id="` + inCart[i].productId + `" data-name="` + inCart[i].productName + `" data-category="` + inCart[i].productCategory + `" data-price="` + inCart[i].productPrice + `" data-description="` + inCart[i].productDescription + `">
                            Remove from Cart
                        </a>
                  </div>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--2-col"></div>`;
        }
        $('#my-cart-list').html(output);
    });

    $('#checkout-tab').click(function(event){
        event.preventDefault();

        var bill = '';

        if(inCart.length > 0){
            $('#checkout-bill').html('');
            
            bill += `
            <div class="mdl-cell mdl-cell--2-col"></div>
            <div class="mdl-cell mdl-cell--8-col">
                <div class="final-card-wide mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Bill</h2>
                    </div>
                    <div class="mdl-card__supporting-text">`;
                    for(var i = 0; i < inCart.length; i++){
                        bill += inCart[i].productName + ` : <span class="fa fa-rupee"></span>` + inCart[i].productPrice + '<br/>';
                    }
                    bill += `
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                    Total : <span class="fa fa-rupee"></span>` + totalSum + `
                    </div>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--2-col"></div>
            `;    
            $('#checkout-bill').html(bill);
        }
    });
});

function getProducts() {
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/shopping-app/collections/products?apiKey=UHnVJJl--aPfvjDlGLVNsFvbeysWuSbG"
    }).done(function(data){
        var output ='';
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
                        id="add-to-cart" href="" data-id="` + data._id.$oid + `" data-name="` + data.productName + `" data-category="` + data.productCategory + `" data-price="` + data.productPrice + `" data-description="` + data.productDescription + `">
                            Add to Cart
                        </a>
                  </div>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--2-col"></div>`;
        });

        $("#product-list").html(output);
    });
}
