export const isValidDate = (dateString: any | string) => {
    const regex =  /^\d{4}-\d{2}-\d{2}$/;
    
    // Invalid format
    if(!String(dateString).match(regex)) 
        return false;

    // Invalid date check
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0)
        return false;           // NaN value, invalid date
    
    return d.toISOString().slice(0, 10) === dateString;
}

export const isValidName = (nameString: string) => {
    const regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/

    // Ko cần xét length vì THợp ' ' trim sẽ còn empty string
    if (nameString.trim().match(regex))
        return true;
    
    return false;
}

export const isValidNameInputs = (inputString: string) => {
    var valid = true;
    
    inputString.split(",").forEach((data, idx) => {
        console.log(idx,' - Data: ',data);
        if (data.trim() === '' || !isValidName(data.trim())) valid = false;
    })
    return valid;
}

export const isValidPassword = (inputPwd: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/

    if (!inputPwd.match(regex))
        return false;
    else
        return true;
}
/**
const isValidNameInputs = (inputString: string) => {
    var valid = true;
    
    inputString.split(",").forEach((data, idx) => {
        console.log(idx,' - Data: ',data);
        if (data.trim() === '' || !isValidName(data.trim())) valid = false;
    })
    return valid;
}
 */