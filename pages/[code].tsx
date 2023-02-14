import Wrapper from "../components/Wrapper";
import {useRouter} from "next/router";
import {SyntheticEvent, useEffect, useState} from "react";
import axios from 'axios';
import constants from "../constants";
import { User } from '../interfaces/user'
import { Product } from '../interfaces/product'
import { Order } from '../interfaces/order' 
import { Quantity } from '../interfaces/quantity' 
declare var Stripe;



//type ProductListType = 
type Props =  {
    user1: User,
    product1: Product,
    order1: Order,
    quantity1: Quantity,
}

const Home = ({user1, product1, order1, quantity1}: Props) => {
    const router = useRouter();
    const {code} = router.query;
    const [user, setUser] = useState(user1);
    const [products, setProducts] = useState([product1]);
    const [quantities, setQuantities] = useState([quantity1]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => {
        if (code !== undefined) {
            (
                async () => {
                    const response = await axios.get(`${constants.endpoint}/links/${code}`);
                    const data = response.data;//.data;

                    ///console.log(data)

                    setUser(data.user);
                    setProducts(data.products);

                    setQuantities(data.products.map((p: Product) => {
                        return {
                            product_id: p.id,
                            quantity: 0
                        }
                    }));
                }
            )();
        }
    }, [code]);

    const quantity = (id: number) => {
        const q = quantities.find((q: Quantity) => q?.product_id === id);
        console.log(q)
        return q ? q.quantity : 0;
    }

    const change = (id: number, quantity: number) => {
        setQuantities(quantities.map((q: Quantity) => {
           // console.log('change ',quantities)
            if (q.product_id === id) {
               // console.log(' change ' + id + ' ' + quantity)
                return {
                    //...q, 
                    product_id: id,
                    quantity: quantity
                }
            }
           // console.log(q)
            return q;
        }));
    }

    const total = () => {
        //console.log('total ', quantities)
        return quantities.reduce((s, q) => {
            const product = products.find((p: Product) => p?.id === q?.product_id);
            return s + product?.price * q?.quantity;
        }, 0)
    }

    // const total = () => {
    //     let t = 0;
    //     console.log(products)
    //     quantities.forEach((q: Quantity) => {
    //         const product = products.find((p: Product) => p?.id === q?.product_id);
    //         t += q?.quantity * parseFloat(product?.price);;
    //     });

    //     return t;
    // }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        console.log(quantities)
        const response = await axios.post(`${constants.endpoint}/orders`, {
            first_name: firstName,
            last_name: lastName,
            email: email,
            address: address,
            address2: address2,
            country: country,
            city: city,
            zip: zip,
            code: code,
            user: 94,
            products: quantities
        });

        console.log(response)
        //console.log(constants.stripe_key)
        const stripe = new Stripe(constants.stripe_key);
        
        stripe.redirectToCheckout({
            sessionId: response.data.id
        });
    }
    //console.log(products)
    return (
        <Wrapper>
            <div className="py-5 text-center">
                <h2>Welcome</h2>
                <p className="lead">{user?.first_name} {user?.last_name} has invited you to buy this item(s).</p>
            </div>

            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Products</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {products.map((p: Product) => {
                            return (
                                <div key={p?.id}>
                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">{p?.title}</h6>
                                            <small className="text-muted">{p?.description}</small>
                                        </div>
                                        <span className="text-muted">${p?.price}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">Quantity</h6>
                                        </div>

                                        <input type="number" min="0" className="text-muted form-control"
                                               style={{width: '65px'}}
                                               defaultValue={quantity(p?.id)}
                                               onChange={e => change(p?.id, parseInt(e.target.value))}
                                        />
                                    </li>
                                </div>
                            )
                        })}

                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${total()}</strong>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Payment Info</h4>
                    <form className="needs-validation" onSubmit={submit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="First Name"
                                       onChange={e => setFirstName(e.target.value)}
                                       required/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Last Name"
                                       onChange={e => setLastName(e.target.value)}
                                       required/>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="you@example.com"
                                   onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="1234 Main St"
                                   onChange={e => setAddress(e.target.value)}
                                   required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address2">Address 2 <span
                                className="text-muted">(Optional)</span></label>
                            <input type="text" className="form-control" id="address2"
                                   onChange={e => setAddress2(e.target.value)}
                                   placeholder="Apartment or suite"/>
                        </div>

                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label htmlFor="country">Country</label>
                                <input type="text" className="form-control" id="country" placeholder="Country"
                                       onChange={e => setCountry(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="city">City</label>
                                <input type="text" className="form-control" id="city" placeholder="City"
                                       onChange={e => setCity(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="zip">Zip</label>
                                <input type="text" className="form-control" id="zip" placeholder="Zip" required
                                       onChange={e => setZip(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Checkout</button>

                    </form>
                    <footer className="my-5 pt-5 text-muted text-center text-small">
                        <p className="mb-1">&copy; 2017-2018 Company Name</p>
                        <ul className="list-inline">
                        <li className="list-inline-item"><a href="#">Privacy</a></li>
                        <li className="list-inline-item"><a href="#">Terms</a></li>
                        <li className="list-inline-item"><a href="#">Support</a></li>
                        </ul>
                    </footer>
                </div>
            </div>
        </Wrapper>
    )
    
};

// @ts-ignore
export default Home;