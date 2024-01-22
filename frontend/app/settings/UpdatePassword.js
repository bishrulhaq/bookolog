"use client"

import React, {useEffect, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {Field, Formik} from "formik";

const updatePassword = ({session, status}) => {

    const [formValues, setFormValues] = useState({
        password: '', confirm_password: ''
    });

    const formValidate = (values) => {
        let errors = {};

        if (!values.password) {
            errors.password = "Password is required";
        }

        if (!values.confirm_password) {
            errors.confirm_password = "Confirm Password is required";
        } else if (values.password !== values.confirm_password) {
            errors.confirm_password = "Passwords do not match";
        }

        return errors;
    };

    const handleSubmit = async () => {
        console.log(formValues)
    };

    return (status === "authenticated" && <div className="rounded bg-gray-50 dark:bg-gray-800">
        <div className="p-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Update User
                Details</h2>
            <Formik
                enableReinitialize
                initialValues={formValues}
                validate={formValidate}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    const {
                        values, handleChange, handleSubmit, errors, touched, handleBlur, isValid, dirty
                    } = formik;
                    return (<form onSubmit={handleSubmit}>

                        <div className="mt-4">
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                Enter Old Password
                            </label>
                            <input
                                type="text"
                                id="password"
                                name="old_password"
                                placeholder="Enter the Old password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`mt-1 p-3 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.first_name && touched.first_name ? "input-error" : ""}`}
                            />
                            {errors.password && touched.password && (
                                <span className="text-red-600 pt-3">{errors.password}</span>)}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                Password
                            </label>
                            <input
                                type="text"
                                id="password"
                                name="password"
                                placeholder="Enter the password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`mt-1 p-3 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.first_name && touched.first_name ? "input-error" : ""}`}
                            />
                            {errors.password && touched.password && (
                                <span className="text-red-600 pt-3">{errors.password}</span>)}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="confirm_password"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="text"
                                id="confirm_password"
                                name="confirm_password"
                                className={`mt-1 p-3 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.last_name && touched.last_name ? "input-error" : ""}`}
                                placeholder="Enter your confirm password"
                                value={values.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.confirm_password && touched.confirm_password && (
                                <span className="text-red-600 pt-3">{errors.confirm_password}</span>)}
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium text-xs leading-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-400 dark:hover:bg-blue-600">
                                Update Password
                            </button>
                        </div>
                    </form>);
                }}
            </Formik>
        </div>
    </div>)
}

export default updatePassword;