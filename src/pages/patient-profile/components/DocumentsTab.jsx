import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentsTab = ({ documents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const getFileTypeIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileText';
      case 'jpg': case'jpeg': case'png': case'gif':
        return 'Image';
      case 'mp4': case'avi': case'mov':
        return 'Video';
      case 'mp3': case'wav':
        return 'Music';
      default:
        return 'File';
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'medical reports':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'test results':
        return 'bg-success/10 text-success border-success/20';
      case 'prescriptions':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'insurance':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'consent forms':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = doc?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doc?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc?.category?.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const DocumentCard = ({ document, isGridView = true }) => (
    <div className={`bg-card rounded-lg border p-4 hover:shadow-elevated transition-gentle ${
      isGridView ? '' : 'flex items-center gap-4'
    }`}>
      <div className={`${isGridView ? 'text-center mb-4' : 'flex-shrink-0'}`}>
        <div className={`${isGridView ? 'w-16 h-16 mx-auto' : 'w-12 h-12'} bg-primary/10 rounded-lg flex items-center justify-center mb-2`}>
          <Icon name={getFileTypeIcon(document?.fileType)} size={isGridView ? 32 : 24} color="var(--color-primary)" />
        </div>
        {isGridView && (
          <span className="text-xs text-muted-foreground uppercase font-medium">{document?.fileType}</span>
        )}
      </div>

      <div className={`${isGridView ? '' : 'flex-1 min-w-0'}`}>
        <h3 className={`font-semibold text-foreground ${isGridView ? 'text-center mb-2' : 'mb-1'} line-clamp-2`}>
          {document?.name}
        </h3>
        
        {!isGridView && (
          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{document?.description}</p>
        )}

        <div className={`${isGridView ? 'text-center' : 'flex items-center gap-4'} text-xs text-muted-foreground mb-3`}>
          <div className={`${isGridView ? 'mb-1' : ''}`}>
            <span>Size: {formatFileSize(document?.size)}</span>
          </div>
          <div className={`${isGridView ? 'mb-1' : ''}`}>
            <span>Uploaded: {document?.uploadDate}</span>
          </div>
          <div>
            <span>By: {document?.uploadedBy}</span>
          </div>
        </div>

        <div className={`${isGridView ? 'text-center mb-3' : 'mb-3'}`}>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(document?.category)}`}>
            {document?.category}
          </span>
        </div>

        {isGridView && document?.description && (
          <p className="text-xs text-muted-foreground text-center mb-3 line-clamp-2">
            {document?.description}
          </p>
        )}

        <div className={`${isGridView ? 'flex justify-center gap-2' : 'flex gap-2'}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDocument(document)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Download
          </Button>
        </div>
      </div>

      {document?.isEncrypted && (
        <div className={`${isGridView ? 'absolute top-2 right-2' : 'flex-shrink-0'}`}>
          <div className="bg-success/10 text-success p-1 rounded">
            <Icon name="Shield" size={16} />
          </div>
        </div>
      )}
    </div>
  );

  const DocumentDetailModal = ({ document, onClose }) => {
    if (!document) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{document?.name}</h2>
              <p className="text-sm text-muted-foreground">{document?.category} • {document?.fileType?.toUpperCase()}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          <div className="p-6 space-y-6">
            {/* Document Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">File Size</label>
                <p className="text-lg font-semibold text-foreground">{formatFileSize(document?.size)}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Upload Date</label>
                <p className="text-lg font-semibold text-foreground">{document?.uploadDate}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Uploaded By</label>
                <p className="text-lg font-semibold text-foreground">{document?.uploadedBy}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Description</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-foreground">{document?.description}</p>
              </div>
            </div>

            {/* Security Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Security Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon 
                      name={document?.isEncrypted ? "Shield" : "ShieldOff"} 
                      size={16} 
                      color={document?.isEncrypted ? "var(--color-success)" : "var(--color-warning)"} 
                    />
                    <label className="text-sm font-medium text-muted-foreground">Encryption</label>
                  </div>
                  <p className="text-sm text-foreground">
                    {document?.isEncrypted ? 'AES-256 Encrypted' : 'Not Encrypted'}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Key" size={16} color="var(--color-primary)" />
                    <label className="text-sm font-medium text-muted-foreground">Access Level</label>
                  </div>
                  <p className="text-sm text-foreground">{document?.accessLevel || 'Standard'}</p>
                </div>
              </div>
            </div>

            {/* Document Preview */}
            {document?.fileType?.toLowerCase() === 'pdf' && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Document Preview</h3>
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <Icon name="FileText" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                  <p className="text-muted-foreground">PDF preview would be displayed here</p>
                  <Button variant="outline" className="mt-4" iconName="ExternalLink" iconPosition="left" iconSize={16}>
                    Open in New Tab
                  </Button>
                </div>
              </div>
            )}

            {/* Version History */}
            {document?.versions && document?.versions?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Version History</h3>
                <div className="space-y-3">
                  {document?.versions?.map((version, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">Version {version?.number}</h4>
                        <span className="text-xs text-muted-foreground">{version?.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{version?.changes}</p>
                      <p className="text-xs text-muted-foreground mt-1">Updated by: {version?.updatedBy}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" iconName="Download" iconPosition="left" iconSize={16}>
                Download
              </Button>
              <Button variant="outline" iconName="Share" iconPosition="left" iconSize={16}>
                Share
              </Button>
              <Button variant="outline" iconName="Edit" iconPosition="left" iconSize={16}>
                Edit Details
              </Button>
              <Button variant="destructive" iconName="Trash2" iconPosition="left" iconSize={16}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Filter" size={20} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">Category:</span>
            <div className="flex flex-wrap gap-2">
              {['all', 'medical reports', 'test results', 'prescriptions', 'insurance', 'consent forms']?.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                >
                  {category?.charAt(0)?.toUpperCase() + category?.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
              iconName="Grid3X3"
              iconSize={16}
            />
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
              iconSize={16}
            />
          </div>
        </div>
      </div>
      {/* Document Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="FileText" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Total Documents</span>
          </div>
          <p className="text-2xl font-bold text-primary">{documents?.length}</p>
        </div>
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Shield" size={20} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Encrypted</span>
          </div>
          <p className="text-2xl font-bold text-success">
            {documents?.filter(d => d?.isEncrypted)?.length}
          </p>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Calendar" size={20} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">This Month</span>
          </div>
          <p className="text-2xl font-bold text-warning">
            {documents?.filter(d => {
              const docDate = new Date(d.uploadDate);
              const currentMonth = new Date()?.getMonth();
              return docDate?.getMonth() === currentMonth;
            })?.length}
          </p>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="HardDrive" size={20} color="var(--color-accent)" />
            <span className="text-sm font-medium text-accent">Total Size</span>
          </div>
          <p className="text-2xl font-bold text-accent">
            {formatFileSize(documents?.reduce((total, doc) => total + doc?.size, 0))}
          </p>
        </div>
      </div>
      {/* Upload New Document */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upload New Document</h3>
            <p className="text-sm text-muted-foreground">Add medical reports, test results, or other patient documents</p>
          </div>
          <Button iconName="Upload" iconPosition="left" iconSize={16}>
            Upload Document
          </Button>
        </div>
      </div>
      {/* Documents Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" :"space-y-4"
      }>
        {filteredDocuments?.length > 0 ? (
          filteredDocuments?.map((document, index) => (
            <DocumentCard key={index} document={document} isGridView={viewMode === 'grid'} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterCategory !== 'all' ?'Try adjusting your search or filter criteria.' :'No documents have been uploaded for this patient yet.'
              }
            </p>
          </div>
        )}
      </div>
      {/* Document Detail Modal */}
      <DocumentDetailModal 
        document={selectedDocument} 
        onClose={() => setSelectedDocument(null)} 
      />
    </div>
  );
};

export default DocumentsTab;