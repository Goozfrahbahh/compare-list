export interface UploadFile { 
	file?: File;
	error?: UploadError;
}

export interface UploadError {
	name: string;
	message: string;
	syscall?: string;
	code?: number;
     errno?: number;
}