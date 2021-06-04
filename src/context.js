import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {

    state = {
        products: [],
        detailProduct: detailProduct,
        cart: storeProducts,
        // cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };
    

    componentDidMount = () => {
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem]
        });
        this.setState({products: tempProducts})
    }

// let tempProducts = [];
// storeProducts.forEach( item => {
//     const singleItem = {...item};
//     products = [...products, singleItem];
// })
// this.setState(() => {
//     return {products}
// })
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        // console.log('i am product:',product)
        return product;
    }

    handleDetail = (id) => {
           const product = this.getItem(id);
           this.setState(() => {
               return {detailProduct:product}
           })
    };
    addToCart = (id) => {
        // console.log(`hello, id is ${id} `) 
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return{products: tempProducts, cart: [...this.state.cart,
            product] }
        }, 
        () => {
            this.addTotals()
        })
    }
    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProduct:product, modalOpen:true}
        })
    }

    closeModal = () => {
            this.setState(() => {
         return {modalOpen:false}
        });
    };
    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {return {cart:[...tempCart]}}, ()=> {
            this.addTotals();
        })
    }
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0) {
            this.removeItem(id)
        }
        else {
            product.total = product.count * product.price;
            this.setState(() => {return {cart:[...tempCart]}}, ()=> {
                this.addTotals();
            })
        }


    }
    removeItem = (id) => {
        let tempProducts = [...this.state.products]
        let tempCart = [...this.state.cart]

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart=false;
        removedProduct.count=0;
        removedProduct.total=0;

        this.setState(() => {
            return {
                cart:[...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        })
    }

    clearCart = () => {
        this.setState(() => {
            return {cart:[]}
        },
        () => {
            this.setProducts();
            this.addTotals();
        }
        )
    }
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total))
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    // tester = () => {
    //     console.log('state products :', this.state.products[0].inCart)
    //     console.log('Data products :', storeProducts[0].inCart)
    //     const tempProducts = [...this.state.products]
    //     tempProducts[0].inCart = true;
    //     this.setState(() => {
    //         return {products:tempProducts}
    //     }, () => {
    //         console.log('state products :', this.state.products[0].inCart)
    //         console.log('Data products :', storeProducts[0].inCart) 
    //     })
    // }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
            }}
            >
                {/* <button onClick={this.tester}> test me</button> */}
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }

// https://youtu.be/-edmQKcOW8s?t=9779







// let tempProducts = [];
// storeProducts.forEach( item => {
//     const singleItem = {...item};
//     products = [...products, singleItem];
// })
// this.setState(() => {
//     return {products}
// })


// funkcja do znajdowania numeru produktu po jego id (najpiew find ten, ktory ma id)
// potem inna funkcja findindex ten, ktory jest zwrocony z tej funkcji na gorze
// https://youtu.be/-edmQKcOW8s?t=12624
// dodawanie total https://youtu.be/-edmQKcOW8s?t=18663