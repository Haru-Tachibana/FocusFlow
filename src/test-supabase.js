// Simple test to verify Supabase connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kekjvetbrhosumdxapgj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtla2p2ZXRicmhvc3VtZHhhcGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTQ0MDEsImV4cCI6MjA3Mzg3MDQwMX0.t9b0PDyhv-JVxmyCy5svVHXGDfvkNNALVDugz5VoCHE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Check if we can connect
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('Data:', data);
    }
  } catch (err) {
    console.error('❌ Connection test failed:', err.message);
  }
}

testConnection();
