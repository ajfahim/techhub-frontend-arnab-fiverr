import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";

const FAQ = () => {
    const [openIndexes, setOpenIndexes] = useState([]);

    const toggleDropdown = (index) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter(i => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    const faqs = [
        { question: "What can I do with my e account?", answer: "You can manage your profile, view transactions, and more." },
        { question: "How do I create my jobseeker profile?", answer: "To create your jobseeker profile, follow these steps..." },
        { question: "How can decide salary for teachers?", answer: "Salary for teachers can be decided based on qualifications and experience..." },
        { question: "What can I do with my e account?", answer: "You can manage your profile, view transactions, and more." },
        { question: "How do I create my jobseeker profile?", answer: "To create your jobseeker profile, follow these steps..." },
        { question: "How can decide salary for teachers?", answer: "Salary for teachers can be decided based on qualifications and experience..." },
        { question: "What can I do with my e account?", answer: "You can manage your profile, view transactions, and more." },
        { question: "How do I create my jobseeker profile?", answer: "To create your jobseeker profile, follow these steps..." },
        { question: "How can decide salary for teachers?", answer: "Salary for teachers can be decided based on qualifications and experience..." },
        { question: "What can I do with my e account?", answer: "You can manage your profile, view transactions, and more." },
        { question: "How do I create my jobseeker profile?", answer: "To create your jobseeker profile, follow these steps..." },
        { question: "How can decide salary for teachers?", answer: "Salary for teachers can be decided based on qualifications and experience..." }
    ];

    return (
        <div>
            <div className="bg-[url('faq-banner.png')] bg-cover">
                <h2 className="text-white text-6xl font-semibold text-center py-56">Frequently Asked Questions</h2>
            </div>
            <div className="w-3/4 mx-auto py-10">
                {faqs.map((faq, index) => (
                    <div className="border-b p-5" key={index}>
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDropdown(index)}>
                            <h4 className="text-xl font-semibold">{faq.question}</h4>
                            {openIndexes.includes(index) ? (
                                <FiMinus className="border border-[#2f9995] p-1 text-2xl rounded-md" />
                            ) : (
                                <GoPlus className="border border-[#2f9995] p-1 text-2xl rounded-md" />
                            )}
                        </div>
                        {openIndexes.includes(index) && <p className="pt-2">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
