import React, { useState } from 'react';
import busImage from '../../assets/images/bus.jpg';
import icon from '../../assets/images/newlogo.png';

export default function Login() {
    const [formData, setFormData] = useState({ staffId: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (value === '') {
            setErrors({ ...errors, [name]: `${name} is required` });
        } else {
            let updatedErrors = { ...errors };
            delete updatedErrors[name];
            setErrors(updatedErrors);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { staffId, password } = formData;
        if (!staffId || !password) {
            setErrors({
                staffId: staffId ? '' : 'Staff Id is required',
                password: password ? '' : 'Password is required'
            });
            return;
        }
        // API call
        try{
            const response = await fetch('http://localhost:8080/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ staffId, password })
            });
            if (response.ok) {
                const data = await response.json();
               console.log("success", data);
            } else {
                const errorData = await response.json();
                console.log("success", errorData);
            }
        }
        catch(error){
            console.log("Error");
        }
    };

    return (
        <>
            <section className="container-fluid login-container">
                <div className="login">
                    <div className='login__image'>
                        <img src={busImage} alt="bus-image" className='login__image-img' />
                    </div>
                    <div className='login__content'>
                        <img src={icon} alt="icon" className='login__icon' />
                        <h1 className='login__title'>MTC-THAMBARAM</h1>
                        <small className='login__subtitle'>An app for bus inspection report</small>
                        <form method='POST' onSubmit={handleFormSubmit} className='login__form'>
                            <div className='login__input-section'>
                                <input
                                    type='text'
                                    name='staffId'
                                    className="login__input"
                                    onChange={handleInputChange}
                                    placeholder='Staff Id'
                                />
                                {errors.staffId && <small className="login__error">{errors.staffId}</small>}
                            </div>
                            <div className='login__input-section'>
                                <input
                                    type="password"
                                    name='password'
                                    className="login__input"
                                    onChange={handleInputChange}
                                    placeholder='Password'
                                />
                                {errors.password && <small className="login__error">{errors.password}</small>}
                            </div>
                            <button type="submit" className='login__btn'>Login</button>
                        </form>
                        <div className='login__info'>
                            <small className='login__info-text'>For forgotten passwords, contact your admin.</small>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
