import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConsentManagementTab = ({ consentRecords }) => {
  const [selectedConsent, setSelectedConsent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'expired':
        return 'bg-error/10 text-error border-error/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'revoked':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredConsents = consentRecords?.filter(consent => 
    filterStatus === 'all' || consent?.status?.toLowerCase() === filterStatus
  );

  const ConsentCard = ({ consent }) => (
    <div className="bg-card rounded-lg border p-6 hover:shadow-elevated transition-gentle">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{consent?.title}</h3>
              <p className="text-sm text-muted-foreground">{consent?.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(consent?.priority)}`}>
                {consent?.priority}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(consent?.status)}`}>
                {consent?.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground">Version</label>
              <p className="text-sm font-medium text-foreground">v{consent?.version}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Signed Date</label>
              <p className="text-sm font-medium text-foreground">{consent?.signedDate}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Expiry Date</label>
              <p className="text-sm font-medium text-foreground">{consent?.expiryDate}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Witness</label>
              <p className="text-sm font-medium text-foreground">{consent?.witness}</p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 mb-4">
            <label className="text-xs text-muted-foreground">Description</label>
            <p className="text-sm text-foreground mt-1">{consent?.description}</p>
          </div>

          {/* Digital Signature Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Shield" size={14} />
              <span>Digital Signature: {consent?.digitalSignature ? 'Verified' : 'Not Available'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              <span>Timestamp: {consent?.timestamp}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="FileText" size={14} />
              <span>Document ID: {consent?.documentId}</span>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedConsent(consent)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Full
          </Button>
          {consent?.status === 'Active' && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Download
            </Button>
          )}
          {consent?.status === 'Expired' && (
            <Button
              variant="default"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={14}
            >
              Renew
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const ConsentDetailModal = ({ consent, onClose }) => {
    if (!consent) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{consent?.title}</h2>
              <p className="text-sm text-muted-foreground">Version {consent?.version} • {consent?.category}</p>
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
            {/* Consent Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(consent?.status)}`}>
                  {consent?.status}
                </span>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Signed Date</label>
                <p className="text-sm font-semibold text-foreground mt-1">{consent?.signedDate}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                <p className="text-sm font-semibold text-foreground mt-1">{consent?.expiryDate}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Priority</label>
                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(consent?.priority)}`}>
                  {consent?.priority}
                </span>
              </div>
            </div>

            {/* Full Consent Text */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Consent Details</h3>
              <div className="bg-muted/30 rounded-lg p-6 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none text-foreground">
                  {consent?.fullText?.split('\n')?.map((paragraph, index) => (
                    <p key={index} className="mb-4 text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Signature Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Signature Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <label className="text-sm font-medium text-muted-foreground">Patient Signature</label>
                  <div className="mt-2 flex items-center gap-2">
                    <Icon 
                      name={consent?.digitalSignature ? "CheckCircle" : "XCircle"} 
                      size={16} 
                      color={consent?.digitalSignature ? "var(--color-success)" : "var(--color-error)"} 
                    />
                    <span className="text-sm text-foreground">
                      {consent?.digitalSignature ? 'Digitally Signed' : 'Not Signed'}
                    </span>
                  </div>
                  {consent?.digitalSignature && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Signature Hash: {consent?.signatureHash}
                    </p>
                  )}
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <label className="text-sm font-medium text-muted-foreground">Witness</label>
                  <p className="text-sm font-semibold text-foreground mt-1">{consent?.witness}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Witnessed on {consent?.witnessDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Audit Trail */}
            {consent?.auditTrail && consent?.auditTrail?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Audit Trail</h3>
                <div className="space-y-3">
                  {consent?.auditTrail?.map((entry, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{entry?.action}</h4>
                        <span className="text-xs text-muted-foreground">{entry?.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry?.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        By: {entry?.performedBy} • IP: {entry?.ipAddress}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" iconName="Download" iconPosition="left" iconSize={16}>
                Download PDF
              </Button>
              {consent?.status === 'Expired' && (
                <Button variant="default" iconName="RefreshCw" iconPosition="left" iconSize={16}>
                  Renew Consent
                </Button>
              )}
              {consent?.status === 'Active' && (
                <Button variant="destructive" iconName="XCircle" iconPosition="left" iconSize={16}>
                  Revoke Consent
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-muted-foreground)" />
          <span className="text-sm font-medium text-foreground">Filter by Status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'active', 'expired', 'pending', 'revoked']?.map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
            >
              {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      {/* Consent Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Active</span>
          </div>
          <p className="text-2xl font-bold text-success">
            {consentRecords?.filter(c => c?.status === 'Active')?.length}
          </p>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={20} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">Pending</span>
          </div>
          <p className="text-2xl font-bold text-warning">
            {consentRecords?.filter(c => c?.status === 'Pending')?.length}
          </p>
        </div>
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
            <span className="text-sm font-medium text-error">Expired</span>
          </div>
          <p className="text-2xl font-bold text-error">
            {consentRecords?.filter(c => c?.status === 'Expired')?.length}
          </p>
        </div>
        <div className="bg-muted/50 border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="XCircle" size={20} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground">Revoked</span>
          </div>
          <p className="text-2xl font-bold text-muted-foreground">
            {consentRecords?.filter(c => c?.status === 'Revoked')?.length}
          </p>
        </div>
      </div>
      {/* Consent List */}
      <div className="space-y-4">
        {filteredConsents?.length > 0 ? (
          filteredConsents?.map((consent, index) => (
            <ConsentCard key={index} consent={consent} />
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No consent records found</h3>
            <p className="text-muted-foreground">
              {filterStatus === 'all' ?'No consent records available for this patient.'
                : `No ${filterStatus} consent records found.`
              }
            </p>
          </div>
        )}
      </div>
      {/* Add New Consent Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Add New Consent
        </Button>
      </div>
      {/* Consent Detail Modal */}
      <ConsentDetailModal 
        consent={selectedConsent} 
        onClose={() => setSelectedConsent(null)} 
      />
    </div>
  );
};

export default ConsentManagementTab;