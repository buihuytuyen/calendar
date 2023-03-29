// Cspell: disable
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Styles.module.scss';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Register() {
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmedPassword: '',
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required('Your name is required')
                .min(4, 'Must be 4 characters or more'),
            email: Yup.string()
                .required('Email is required')
                .matches(
                    // eslint-disable-next-line no-useless-escape
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    'Please enter a vaild email address'
                ),
            password: Yup.string()
                .required('Password is required')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    'Password must be 7-19 characters and contain at least one letter, one number and a special character'
                ),
            confirmedPassword: Yup.string()
                .required('Confirmed Password is required')
                .oneOf([Yup.ref('password'), null], 'Password must match'),
        }),

        // Submit
        onSubmit: (values) => {
            axios
                .post('http://127.0.0.1:8000/api/signup', values)
                .then((res) => {
                    alert('Sign Up Success!');
                    setIsSubmitSuccess(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    // Register
    // const handleRegister = (e) => {
    //     const formData = {
    //         name,
    //         email,
    //         password,
    //     };

    //
    //     axios
    //         .post('https://jsonplaceholder.typicode.com/todos', formData)
    //         .then((response) => {
    //             setRegisterSuccess(true);
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    //     //
    //     e.preventDefault();
    // };

    return (
        <div className={cx('main')}>
            <form className={cx('form')} onSubmit={formik.handleSubmit}>
                <h3 className={cx('heading')}>Sign Up</h3>
                <div className={cx('spacer')}></div>

                {isSubmitSuccess ? (
                    <div className={cx('form-group')}>
                        <p className={cx('sign-up-text')}>Sign Up Success!</p>
                        <Link
                            to="/login"
                            className={cx('submit-success-login')}
                        >
                            Login
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Name */}
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>
                                Your name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className={cx(
                                    `${
                                        formik.errors.name
                                            ? 'form-control-error'
                                            : 'form-control'
                                    }`
                                )}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder="Enter your name"
                            />
                            {formik.errors.name && (
                                <p className={cx('errorMsg')}>
                                    {formik.errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Email</label>
                            <input
                                type="email"
                                name="email"
                                className={cx(
                                    `${
                                        formik.errors.email
                                            ? 'form-control-error'
                                            : 'form-control'
                                    }`
                                )}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Enter your email"
                            />
                            {formik.errors.email && (
                                <p className={cx('errorMsg')}>
                                    {' '}
                                    {formik.errors.email}{' '}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Password</label>
                            <input
                                type="password"
                                name="password"
                                className={cx(
                                    `${
                                        formik.errors.password
                                            ? 'form-control-error'
                                            : 'form-control'
                                    }`
                                )}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder="Enter your password"
                            />
                            {formik.errors.password && (
                                <p className={cx('errorMsg')}>
                                    {' '}
                                    {formik.errors.password}{' '}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="confirmedPassword"
                                className={cx(
                                    `${
                                        formik.errors.confirmedPassword
                                            ? 'form-control-error'
                                            : 'form-control'
                                    }`
                                )}
                                value={formik.values.confirmedPassword}
                                onChange={formik.handleChange}
                                placeholder="Confirmation your password"
                            />
                            {formik.errors.confirmedPassword && (
                                <p className={cx('errorMsg')}>
                                    {' '}
                                    {formik.errors.confirmedPassword}{' '}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={cx('form-submit-register')}
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}
