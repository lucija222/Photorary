export const photoAlt = (description: string | null, name: string): string => {
    
    if (description) {
        return description;
        
    } else {
        return `By ${name}`;
    }
};
