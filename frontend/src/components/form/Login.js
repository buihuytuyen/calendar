// Cspell: disable
// import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Styles.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';

const cx = classNames.bind(styles);

export default function Login() {
    const { setUser } = useContext(GlobalContext);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
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
        }),

        onSubmit: (values) => {
            axios
                .post('http://127.0.0.1:8000/api/login', values)
                .then((res) => {
                    setUser({ userId: res.data[1], username: res.data[0] });
                    console.log(res)
                    navigate('/home');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    return (
        <div className={cx('main')}>
            <form className={cx('form')} onSubmit={formik.handleSubmit}>
                <h3 className={cx('heading')}>Login</h3>

                <div className={cx('spacer')}></div>

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

                <div className={cx('btn-group')}>
                    <Link to="/signup" className={cx('form-submit')}>
                        Sign Up
                    </Link>
                    <button type="submit" className={cx('form-submit')}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
