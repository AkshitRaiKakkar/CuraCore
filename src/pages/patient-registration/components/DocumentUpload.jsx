import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DocumentUpload = ({ formData, onFormDataChange, errors }) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragOver, setDragOver] = useState(null);

  const documentTypes = [
    {
      id: 'photo',
      label: 'Profile Photo',
      description: 'Recent passport-size photograph',
      required: true,
      accept: 'image/*',
      maxSize: '2MB'
    },
    {
      id: 'identity',
      label: 'Identity Proof',
      description: 'Aadhar Card, PAN Card, or Passport',
      required: true,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: '5MB'
    },
    {
      id: 'insurance',
      label: 'Insurance Card',
      description: 'Health insurance card (if applicable)',
      required: false,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: '5MB'
    },
    {
      id: 'medical',
      label: 'Medical Reports',
      description: 'Previous medical reports or prescriptions',
      required: false,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: '10MB',
      multiple: true
    }
  ];

  const handleFileSelect = (documentType, files) => {
    const fileList = Array.from(files);
    
    // Simulate upload progress
    fileList?.forEach((file, index) => {
      const fileId = `${documentType}-${index}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev?.[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);
    });

    // Update form data
    const currentDocuments = formData?.documents || {};
    onFormDataChange({
      ...formData,
      documents: {
        ...currentDocuments,
        [documentType]: documentTypes?.find(dt => dt?.id === documentType)?.multiple 
          ? [...(currentDocuments?.[documentType] || []), ...fileList]
          : fileList?.[0]
      }
    });
  };

  const handleDragOver = (e, documentType) => {
    e?.preventDefault();
    setDragOver(documentType);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(null);
  };

  const handleDrop = (e, documentType) => {
    e?.preventDefault();
    setDragOver(null);
    const files = e?.dataTransfer?.files;
    handleFileSelect(documentType, files);
  };

  const removeDocument = (documentType, fileIndex = null) => {
    const currentDocuments = formData?.documents || {};
    let updatedDocuments = { ...currentDocuments };
    
    if (fileIndex !== null && Array.isArray(updatedDocuments?.[documentType])) {
      updatedDocuments[documentType] = updatedDocuments?.[documentType]?.filter((_, index) => index !== fileIndex);
    } else {
      delete updatedDocuments?.[documentType];
    }
    
    onFormDataChange({
      ...formData,
      documents: updatedDocuments
    });
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Upload" size={20} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-accent-foreground mb-1">Document Upload Guidelines</h4>
            <ul className="text-sm text-accent-foreground space-y-1">
              <li>• Upload clear, readable images or PDF files</li>
              <li>• Maximum file size limits are mentioned for each document type</li>
              <li>• Required documents must be uploaded to complete registration</li>
              <li>• All uploaded documents are encrypted and stored securely</li>
            </ul>
          </div>
        </div>
      </div>
      {documentTypes?.map((docType) => {
        const currentFiles = formData?.documents?.[docType?.id];
        const hasFiles = docType?.multiple ? currentFiles?.length > 0 : currentFiles;
        
        return (
          <div key={docType?.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground flex items-center space-x-2">
                  <span>{docType?.label}</span>
                  {docType?.required && (
                    <span className="text-error text-sm">*</span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{docType?.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max size: {docType?.maxSize} | Formats: {docType?.accept}
                </p>
              </div>
              {hasFiles && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm">Uploaded</span>
                </div>
              )}
            </div>
            {/* Upload Area */}
            <div
              className={`
                border-2 border-dashed rounded-lg p-6 text-center transition-colors
                ${dragOver === docType?.id 
                  ? 'border-primary bg-primary/5' :'border-muted-foreground/30 hover:border-primary/50'
                }
              `}
              onDragOver={(e) => handleDragOver(e, docType?.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, docType?.id)}
            >
              <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to select
              </p>
              <input
                type="file"
                accept={docType?.accept}
                multiple={docType?.multiple}
                onChange={(e) => handleFileSelect(docType?.id, e?.target?.files)}
                className="hidden"
                id={`file-${docType?.id}`}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(`file-${docType?.id}`)?.click()}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Choose Files
              </Button>
            </div>
            {/* File List */}
            {hasFiles && (
              <div className="mt-4 space-y-2">
                {docType?.multiple && Array.isArray(currentFiles) ? (
                  currentFiles?.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <Icon name="FileText" size={16} className="text-primary" />
                        <div>
                          <p className="text-sm font-medium">{file?.name}</p>
                          <p className="text-xs text-muted-foreground">{getFileSize(file?.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {uploadProgress?.[`${docType?.id}-${index}`] !== undefined && 
                         uploadProgress?.[`${docType?.id}-${index}`] < 100 && (
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${uploadProgress?.[`${docType?.id}-${index}`]}%` }}
                            />
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDocument(docType?.id, index)}
                          iconName="X"
                          iconSize={14}
                        />
                      </div>
                    </div>
                  ))
                ) : currentFiles && (
                  <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="FileText" size={16} className="text-primary" />
                      <div>
                        <p className="text-sm font-medium">{currentFiles?.name}</p>
                        <p className="text-xs text-muted-foreground">{getFileSize(currentFiles?.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {uploadProgress?.[`${docType?.id}-0`] !== undefined && 
                       uploadProgress?.[`${docType?.id}-0`] < 100 && (
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${uploadProgress?.[`${docType?.id}-0`]}%` }}
                          />
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDocument(docType?.id)}
                        iconName="X"
                        iconSize={14}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {errors?.[docType?.id] && (
              <p className="text-sm text-error mt-2">{errors?.[docType?.id]}</p>
            )}
          </div>
        );
      })}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={20} color="var(--color-warning)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-warning-foreground mb-1">Document Security</h4>
            <p className="text-sm text-warning-foreground">
              All uploaded documents are encrypted using AES-256 encryption and stored in compliance with healthcare data protection standards. 
              Documents are accessible only to authorized medical personnel and will be permanently deleted upon request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;