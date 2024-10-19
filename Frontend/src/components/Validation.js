// validform je ek function hai jismai create emp ka data pass hoga 
// trim -> remote the extra space
export const validateForm = (data) => {
    const errors = {};
     
    if (!data.name.trim()) {
        errors.name = 'Name is required';
    }

    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
    }
    
    if (!data.phone.trim()) {
        errors.phone = 'Phone is required';
    }
if (!data.doj.trim()) {
        errors.doj = 'Doj is required';
    }
    
    if (data.salary==0) {
        errors.salary = 'Salary is required';

    }else if (data.salary<10000) {
        errors.salary = 'Minimum Salary Limit is 10000';
    }
    else if (data.salary>40000) {
        errors.salary = 'Maximum Salary Limit is 40000';
    }

    if (!data.dept.trim()) {
        errors.dept = 'Dept is required';
    }
return errors;
}; 
