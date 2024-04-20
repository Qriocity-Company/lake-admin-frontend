export const createCustomers= async ()=>{

    let customers=[]
    const indianNames = ['Rahul Kumar', 'Priya Patel', 'Amit Singh', 'Deepika Sharma', 'Vivek Verma','Arjun Kapoor','Mahira Thapliyal', 'Raj Singh','Alice Palmer','Yogendar Singh','Meera Verma'];
    const indianLocations = [
      'Mumbai, Maharashtra',
      'Delhi, Delhi',
      'Bangalore, Karnataka',
      'Hyderabad, Telangana',
      'Chennai, Tamil Nadu',
      'Kolkata, West Bengal',
      'Jaipur, Rajasthan',
      'Lucknow, Uttar Pradesh',
      'Ahmedabad, Gujarat',
      'Pune, Maharashtra',
      'Chandigarh, Chandigarh',
      'Bhopal, Madhya Pradesh',
    ];
    for (let i = 0; i < 40; i++) {
      customers.push({
        name: indianNames[i % indianNames.length],
        age: Math.floor(Math.random() * 20) + 20, // Random age between 20 and 40
        number: '9' + Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join(''),
        location: indianLocations[Math.floor(Math.random()*(indianLocations.length-1))],
      });
    }

    console.log(customers);
    
    try {
      const response = await fetch(`${host}/customer/create-multiple-customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Corrected Content-Type
        },
        body: JSON.stringify({ customers: customers }),
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // setCustomers(data.customers);
      } else {
        console.error('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }