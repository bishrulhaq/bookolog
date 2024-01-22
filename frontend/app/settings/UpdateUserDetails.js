"use client"

import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Field, Formik} from "formik";
import {fetchUser, updateUser} from "@/utils";

const updateUserDetails = ({session, status, update, setNotification}) => {

    const [formValues, setFormValues] = useState({
        id: '', first_name: '', last_name: '', gender: '', date_of_birth: null, country: ''
    });


    const formValidate = (values) => {

        let errors = {};

        if (!values.first_name) {
            errors.first_name = "First Name is required";
        }

        if (!values.last_name) {
            errors.last_name = "Last Name is required";
        }

        if (!values.date_of_birth) {
            errors.date_of_birth = "Date of Birth is required";
        }

        if (!values.gender) {
            errors.gender = "Gender is required";
        }

        if (!values.country) {
            errors.country = "Country is required";
        }

        return errors;
    };

    const fetchUserData = async () => {
        try {
            const response = await fetchUser(session?.user?.id);
            const data = await response.data;
            setFormValues({
                id: session?.user?.id,
                first_name: data.first_name,
                last_name: data.last_name,
                gender: data.gender,
                date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : null,
                country: data.country
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchUserData();
        }
    }, [status]);

    const handleSubmit = async (formValues) => {

        setNotification(null);

        try {
            const response = await updateUser(formValues);

            if (response.status === 200) {
                await update({user: formValues});
                setNotification({message: response.message, type: 'success', duration: 1200});
            }

            return {message: response.message};
        } catch (error) {
            return {error: 'Failed to create account'};
        }

    };

    return ( <div className="rounded bg-gray-50 dark:bg-gray-800">
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
                        values, isSubmitting, dirty, errors, handleSubmit, isValid, touched, handleChange, handleBlur
                    } = formik;
                    return (<form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label htmlFor="first_name"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="Enter your first name"
                                value={values.first_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`mt-1 p-3 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.first_name && touched.first_name ? "input-error" : ""}`}
                            />
                            {errors.first_name && touched.first_name && (
                                <span className="text-red-600 pt-3">{errors.first_name}</span>)}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="last_name"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                className={`mt-1 p-3 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.last_name && touched.last_name ? "input-error" : ""}`}
                                placeholder="Enter your last name"
                                value={values.last_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.last_name && touched.last_name && (
                                <span className="text-red-600 pt-3">{errors.last_name}</span>)}
                        </div>


                        <div className="mt-4 flex flex-wrap gap-2">
                            <div className="flex-1">
                                <label htmlFor="date_of_birth"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                                    Date of Birth
                                </label>

                                <Field id="date_of_birth"
                                       name="date_of_birth"
                                       selected={values.date_of_birth}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                    {({field, form}) => (<DatePicker
                                        name="date"
                                        placeholder="Enter Date of Birth"
                                        wrapperClassName="w-full"
                                        className="mt-1 p-3 block flex-1 w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        {...field}
                                        selected={field.value}
                                        onChange={(date) => form.setFieldValue(field.name, date)}
                                    />)}
                                </Field>

                                {errors.date_of_birth && touched.date_of_birth && (
                                    <span className="text-red-600 pt-3">{errors.date_of_birth}</span>)}

                            </div>
                            <div className="flex-1">
                                <label htmlFor="gender"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="mt-1 p-3 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option defaultValue="" selected>Select the Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="prefer_not_to_say">Prefer not to say</option>
                                </select>
                                {errors.gender && touched.gender && (
                                    <span className="text-red-600 pt-3">{errors.gender}</span>)}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="country"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                Country
                            </label>
                            <select
                                id="country"
                                name="country"
                                className="mt-1 p-3 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                value={values.country}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value="" selected>Select the Country</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="India">India</option>
                                <option value="United States">United States</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.country && touched.country && (
                                <span className="text-red-600 pt-3">{errors.country}</span>)}
                        </div>

                        <div className="mt-6">
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium text-xs leading-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-400 dark:hover:bg-blue-600">
                                {isSubmitting ? "Updating..." : "Update Details"}
                            </button>
                        </div>
                    </form>);
                }}
            </Formik>
        </div>
    </div>)
}

export default updateUserDetails;