"use client"
import React, {Suspense, useEffect, useRef, useState} from "react";
import SelectedBooks from "@/components/SelectedBooks";
import GenreMultiSelect from "@/components/GenreSelector";
import {useSession} from "next-auth/react";
import {Field, Formik, useFormik} from "formik";
import {insertBookInteraction} from "@/utils";

export default function exportBooks({setNotification, user}) {
    const [formData, setFormData] = useState({
        selected_book: [], description: "", exchange_book: [], genres: []
    });
    const [resetSelectedBooks, setResetSelectedBooks] = useState(false);

    const formValidate = (values) => {
        let errors = {};

        if (values.selected_book.length === 0) {
            errors.selected_book = "Book is required";
        }

        if (!values.description) {
            errors.description = "Description is required";
        }

        if (!values.type) {
            errors.type = "Type is required";
        }

        if (values.type === "genres" && values.genres.length === 0) {
            errors.genres = "Genre is required";
        }


        if (values.type === "books" && values.exchange_book.length === 0) {
            errors.exchange_book = "Exchange Book is required";
        }

        return errors;
    };

    const handleSubmit = async (formData, {resetForm}) => {

        setNotification(null);
        setResetSelectedBooks(false);

        const data = {
            ...formData,
            country_code: user?.country_code,
            user_id: user?.id,
            interaction_type: "exchange"
        }

        try {
            const response = await insertBookInteraction(data, user?.j_token);

            if (response.status === 200) {
                setNotification({message: response.message, type: 'success', duration: 1200});
                setResetSelectedBooks(true);
                resetForm();
            }

            return {message: response.message};
        } catch (error) {
            return {error: 'Failed to create account'};
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={formData}
            validate={formValidate}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                const {
                    values, isSubmitting, dirty, errors, handleSubmit, isValid, touched, handleChange, handleBlur
                } = formik;
                return (

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="bg-white shadow rounded-lg mb-6 p-4 dark:bg-gray-900">
                            <div className="mb-5">
                                <label htmlFor="search"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a
                                    Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Describe"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                {errors.description && touched.description && (
                                    <span className="text-red-600 pt-3">{errors.description}</span>)}
                            </div>

                            <Field id="selected_book"
                                   name="selected_book"
                                   selected={values.selected_book}
                                   onChange={handleChange}
                                   onBlur={handleBlur}>
                                {({field, form}) => (<SelectedBooks
                                    name="selected_book"
                                    bookCount={1}
                                    {...field}
                                    selectedBooks={field.value}
                                    reset={resetSelectedBooks}
                                    onSelectedBooksChange={(books) => {
                                        form.setFieldValue(field.name, books)
                                    }}
                                />)}
                            </Field>


                            {errors.selected_book && touched.selected_book && (
                                <span className="text-red-600 pt-3">{errors.selected_book}</span>)}


                            <div className="mb-5">
                                <label htmlFor="search"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Exchange
                                    based on </label>
                                <select
                                    name="type"
                                    id="type"
                                    onChange={handleChange}
                                    value={values.type}
                                    onBlur={handleBlur}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select Type</option>
                                    <option value="books">Books</option>
                                    <option value="genres">Genres</option>

                                </select>
                                {errors.type && touched.type && (
                                    <span className="text-red-600 pt-3">{errors.type}</span>)}
                            </div>


                            {values.type === "genres" && (<>
                                <Field id="genres"
                                       name="genres"
                                       selected={values.genres}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                    {({field, form}) => (<GenreMultiSelect
                                        name="genres"
                                        {...field}
                                        selectedGenres={field.value}
                                        onSelectedGenresChange={(genres) => form.setFieldValue(field.name, genres)}
                                    />)}
                                </Field>

                                {errors.genres && touched.genres && (
                                    <span className="text-red-600 pt-3">{errors.genres}</span>)}
                            </>)}

                            {values.type === "books" && (<>

                                <Field id="exchange_book"
                                       name="exchange_book"
                                       selected={values.exchange_book}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                    {({field, form}) => (<SelectedBooks
                                        name="exchange_book"
                                        bookCount={1}
                                        reset={resetSelectedBooks}
                                        {...field}
                                        onSelectedBooksChange={(books) => form.setFieldValue(field.name, books)}
                                    />)}
                                </Field>

                                {errors.exchange_book && touched.exchange_book && (
                                    <span className="text-red-600 pt-3">{errors.exchange_book}</span>)}
                            </>)}

                            <footer className="flex justify-between mt-2">
                                <div className="flex gap-2 text-sm">
                                    <span
                                        className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                             strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                             className="css-i6dzq1">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </span>
                                    <span className="h-8 pt-1.5 dark:text-white">
                                        {user?.country_code}
                                    </span>
                                </div>
                                <button
                                    className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">
                                    Create Exchange
                                </button>
                            </footer>
                        </div>
                    </form>)
            }}
        </Formik>)
}