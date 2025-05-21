'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactFormValues } from '@/lib/validations/contact';

export default function FormExamplesPage() {
  const { t } = useTranslation();
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);

  const handleFormSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real app, you would send this data to your API
    console.log('Form submitted:', data);
    
    // For demo purposes, store the submitted data to display it
    setSubmittedData(data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Zod Form Validation Examples</h1>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">About Zod</h2>
        <p className="mb-3">
          Zod is a TypeScript-first schema validation library that ensures your data is correctly structured at runtime.
          It provides type inference, meaning you get type safety without having to maintain separate type definitions.
        </p>
        <p className="mb-3">
          Key benefits of using Zod:
        </p>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li>Strong type inference for TypeScript</li>
          <li>Composable and extendable schemas</li>
          <li>Detailed error messages</li>
          <li>Runtime validation (not just compile-time)</li>
          <li>Seamless integration with form libraries like React Hook Form</li>
        </ul>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Contact Form Example</h2>
        <p className="mb-4">
          This example uses Zod with React Hook Form to validate the contact form.
          Try submitting invalid data to see the validation in action.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-medium mb-4">Contact Form</h3>
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-medium mb-4">Submitted Data</h3>
            {submittedData ? (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Name:</span> {submittedData.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {submittedData.email}
                </p>
                <p>
                  <span className="font-semibold">Subject:</span> {submittedData.subject}
                </p>
                <p>
                  <span className="font-semibold">Message:</span>
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md whitespace-pre-wrap">
                  {submittedData.message}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                No data submitted yet. Fill out and submit the form to see the results here.
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Zod Implementation</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">1. Schema Definition</h3>
          <p className="mb-2">
            First, we define our validation schema using Zod:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
{`import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters' })
    .max(100, { message: 'Subject must be less than 100 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
});

// Type for the contact form values
export type ContactFormValues = z.infer<typeof contactFormSchema>;`}
          </pre>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">2. Form Integration</h3>
          <p className="mb-2">
            Then, we integrate the Zod schema with React Hook Form:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
{`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contact';

// Inside your component:
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm<ContactFormValues>({
  resolver: zodResolver(contactFormSchema),
  defaultValues: {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
});`}
          </pre>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">3. Server Actions</h3>
          <p className="mb-2">
            Zod can also be used to validate data in server actions:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
{`import { z } from 'zod';
import { createSafeAction } from '@/lib/zodUtils';

const formSchema = z.object({
  // Your schema here
});

// Create type-safe server action
export const submitFormAction = createSafeAction(
  formSchema,
  async (validatedData) => {
    // Process the validated data
    // This only runs if validation passes
    return { success: true };
  }
);`}
          </pre>
        </div>
      </div>
    </div>
  );
}
