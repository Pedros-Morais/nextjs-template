import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';
import { validateWithZod } from '@/lib/zodUtils';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the request body against our schema
    const validation = validateWithZod(contactFormSchema, body);
    
    if (!validation.success) {
      // Return validation errors
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }
    
    // At this point, data is validated and typed
    const validatedData = validation.data;
    
    // Process the data (in a real app, this might be saving to a database)
    console.log('Processing form submission:', validatedData);
    
    // Simulate API processing time
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request' 
      },
      { status: 500 }
    );
  }
}
