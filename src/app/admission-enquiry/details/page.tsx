'use client'
import { AcadamicDetails, Confirmation, ContactDetails, DocumentUpload, StudentDetails } from "@/app/container";
import { useState } from "react";
import { useFormik } from "formik";
import { academicDetailsSchema, contactDetailsSchema, studentDetailsSchema } from "@/app/utilis/schema";
import { initialDetailsData } from "@/app/utilis/data";


const Details: React.FC = () => {
    // State to track active tab
    const [activeTab, setActiveTab] = useState<number>(0);

    // Function to handle next button click
    const handleNext = (): void => {
        console.log(formik.isValid)
        if (formik.isValid) {
            setActiveTab(prev => Math.min(prev + 1, formElements.length - 1));
        }
    };

   
    const handleBack = (): void => {
        const previousTab = Math.max(activeTab - 1, 0);
        const valuesForPreviousTab = values[previousTab as unknown as keyof typeof values];
        formik.setValues({
            ...formik.values,
            ...(valuesForPreviousTab as unknown as Record<string, any>), // Type assertion to ensure TypeScript recognizes it as an object with string keys and any values
        });
        setActiveTab(previousTab);
    };

    const handleTabClick = (index: number): void => {
        setActiveTab(index);
    };

    const activeSchema = (tab: number) => {
        switch (tab) {
            case 0:
                return studentDetailsSchema;
            case 1:
                return contactDetailsSchema;
            case 2:
                return academicDetailsSchema;
            default:
                break;
        }
    }

    const formik = useFormik({
        initialValues: initialDetailsData,
        validationSchema: activeSchema(activeTab),
        onSubmit: async values => {
            try {
                setActiveTab(prev => Math.min(prev + 1, formElements.length - 1));

                console.log(values)
            } catch (error) {
                console.error("An error occurred during registration:", error);
            }
        },
    })

    const { values, handleChange, errors, handleSubmit } = formik;
    // console.log('value', values, 'error', errors)

    // Array of form components
    const formElements: JSX.Element[] = [
        <StudentDetails key={0} values={values} handleChange={handleChange} errors={errors} />,
        <ContactDetails key={1} values={values} handleChange={handleChange} errors={errors} />,
        <AcadamicDetails key={2} values={values} handleChange={handleChange} errors={errors} />,
        <DocumentUpload key={3} />,
        <Confirmation key={4}  values={values}/>,
    ];


    return (
        <section className="bg-purple-50 min-h-screen">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center px-8 pb-8 mx-auto pt-[14rem] md:pt-[8rem] ">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            {/* Step indicator */}
                            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base  flex-wrap md:flex-nowrap">
                                {formElements.map((_, index) => (
                                    <li key={index}
                                        onClick={() => handleTabClick(index)}
                                        className={`${index <= activeTab ? 'text-blue-600 after:border-blue-200' : 'text-gray after:border-gray-200'} 
                                    ${index === formElements.length - 1 ? '' : 'after:border-b  after:border-1 after:hidden'}
                                    flex md:w-full items-center  sm:after:content-[''] after:w-full after:h-1  sm:after:inline-block after:mx-6 xl:after:mx-10 cursor-pointer`}>
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                                            {
                                                index <= activeTab ? <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                </svg> : <span className="me-2">{index + 1}</span>
                                            }
                                            {index === 0 ? <> Student <span className="hidden sm:inline-flex sm:ms-2"> Details </span></> :
                                                index === 1 ? <> Contact <span className="hidden sm:inline-flex sm:ms-2"> Details </span></> :
                                                    index === 2 ? <> Acadamic <span className="hidden sm:inline-flex sm:ms-2"> Details </span></> :
                                                        index === 3 ? <> Document <span className="hidden sm:inline-flex sm:ms-2"> Upload </span></> :
                                                            'Confirmation'}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>


                    {/* Render active form element */}
                    <div className="w-full bg-white rounded-lg shadow  xl:p-0 mt-4">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="flex flex-col justify-center">
                                <div>{formElements[activeTab]}</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-lg shadow  xl:p-0  mt-4 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <div className="flex flex-wrap gap-x-6 mx-auto justify-between w-full">
                                <button
                                    disabled={activeTab === 0}
                                    onClick={handleBack}
                                    className={`px-4 py-2 rounded-xl bg-blue-600 text-white ${activeTab === 0
                                        ? 'opacity-50 bg-slate-600'
                                        : 'opacity-100'
                                        }`}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={activeTab === formElements.length - 1}
                                    // onClick={handleNext}
                                    className={`px-4 py-2 rounded-xl bg-blue-600 text-white ${activeTab === formElements.length - 1
                                        ? 'opacity-50 bg-slate-600 hidden'
                                        : 'opacity-100'
                                        }`}
                                >
                                    Next
                                </button>
                                {activeTab === formElements.length - 1 && (
                                    <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" type="submit">
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section >
    );
};

export default Details