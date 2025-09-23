import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BillingTab = ({ billingData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'overdue':
        return 'bg-error/10 text-error border-error/20';
      case 'cancelled':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'cash':
        return 'Banknote';
      case 'card': case'credit card': case'debit card':
        return 'CreditCard';
      case 'upi':
        return 'Smartphone';
      case 'bank transfer':
        return 'Building2';
      case 'insurance':
        return 'Shield';
      default:
        return 'Wallet';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const filteredInvoices = billingData?.invoices?.filter(invoice => {
    const matchesSearch = invoice?.invoiceNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         invoice?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice?.status?.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const InvoiceCard = ({ invoice }) => (
    <div className="bg-card rounded-lg border p-6 hover:shadow-elevated transition-gentle">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">#{invoice?.invoiceNumber}</h3>
              <p className="text-sm text-muted-foreground">{invoice?.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice?.status)}`}>
              {invoice?.status}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground">Invoice Date</label>
              <p className="text-sm font-medium text-foreground">{invoice?.date}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Due Date</label>
              <p className="text-sm font-medium text-foreground">{invoice?.dueDate}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Amount</label>
              <p className="text-lg font-bold text-foreground">{formatCurrency(invoice?.amount)}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Payment Method</label>
              <div className="flex items-center gap-1">
                <Icon name={getPaymentMethodIcon(invoice?.paymentMethod)} size={14} />
                <span className="text-sm font-medium text-foreground">{invoice?.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-4">
            <label className="text-xs text-muted-foreground mb-2 block">Services</label>
            <div className="flex flex-wrap gap-2">
              {invoice?.services?.map((service, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                >
                  {service?.name} - {formatCurrency(service?.amount)}
                </span>
              ))}
            </div>
          </div>

          {/* Tax Breakdown */}
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="text-muted-foreground">Subtotal</label>
                <p className="font-medium text-foreground">{formatCurrency(invoice?.subtotal)}</p>
              </div>
              <div>
                <label className="text-muted-foreground">GST ({invoice?.gstRate}%)</label>
                <p className="font-medium text-foreground">{formatCurrency(invoice?.gstAmount)}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Discount</label>
                <p className="font-medium text-foreground">-{formatCurrency(invoice?.discount || 0)}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Total</label>
                <p className="font-bold text-foreground">{formatCurrency(invoice?.amount)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedInvoice(invoice)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Details
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
          {invoice?.status === 'Pending' && (
            <Button
              variant="default"
              size="sm"
              iconName="CreditCard"
              iconPosition="left"
              iconSize={14}
            >
              Pay Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const InvoiceDetailModal = ({ invoice, onClose }) => {
    if (!invoice) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Invoice #{invoice?.invoiceNumber}</h2>
              <p className="text-sm text-muted-foreground">{invoice?.description}</p>
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
            {/* Invoice Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Bill To</h3>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">{invoice?.billTo?.name}</p>
                  <p className="text-sm text-muted-foreground">{invoice?.billTo?.address}</p>
                  <p className="text-sm text-muted-foreground">{invoice?.billTo?.phone}</p>
                  <p className="text-sm text-muted-foreground">{invoice?.billTo?.email}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Invoice Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invoice Date:</span>
                    <span className="font-medium text-foreground">{invoice?.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium text-foreground">{invoice?.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice?.status)}`}>
                      {invoice?.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Table */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Services</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Service</th>
                      <th className="text-center py-3 text-sm font-medium text-muted-foreground">Quantity</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Rate</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice?.services?.map((service, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">
                          <div>
                            <p className="font-medium text-foreground">{service?.name}</p>
                            <p className="text-xs text-muted-foreground">{service?.description}</p>
                          </div>
                        </td>
                        <td className="text-center py-3 text-foreground">{service?.quantity}</td>
                        <td className="text-right py-3 text-foreground">{formatCurrency(service?.rate)}</td>
                        <td className="text-right py-3 font-medium text-foreground">{formatCurrency(service?.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium text-foreground">{formatCurrency(invoice?.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST ({invoice?.gstRate}%):</span>
                  <span className="font-medium text-foreground">{formatCurrency(invoice?.gstAmount)}</span>
                </div>
                {invoice?.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="font-medium text-success">-{formatCurrency(invoice?.discount)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-foreground">Total Amount:</span>
                    <span className="text-lg font-bold text-foreground">{formatCurrency(invoice?.amount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            {invoice?.paymentHistory && invoice?.paymentHistory?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Payment History</h3>
                <div className="space-y-3">
                  {invoice?.paymentHistory?.map((payment, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon name={getPaymentMethodIcon(payment?.method)} size={16} color="var(--color-primary)" />
                          <span className="font-medium text-foreground">{payment?.method}</span>
                        </div>
                        <span className="font-bold text-foreground">{formatCurrency(payment?.amount)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Transaction ID: {payment?.transactionId}</span>
                        <span>{payment?.date}</span>
                      </div>
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
              <Button variant="outline" iconName="Printer" iconPosition="left" iconSize={16}>
                Print
              </Button>
              {invoice?.status === 'Pending' && (
                <Button variant="default" iconName="CreditCard" iconPosition="left" iconSize={16}>
                  Pay Now
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
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-muted-foreground)" />
          <span className="text-sm font-medium text-foreground">Status:</span>
          <div className="flex flex-wrap gap-2">
            {['all', 'paid', 'pending', 'overdue', 'cancelled']?.map((status) => (
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
      </div>
      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Receipt" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Total Invoices</span>
          </div>
          <p className="text-2xl font-bold text-primary">{billingData?.invoices?.length}</p>
        </div>
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Paid Amount</span>
          </div>
          <p className="text-2xl font-bold text-success">{formatCurrency(billingData?.totalPaid)}</p>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={20} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">Pending Amount</span>
          </div>
          <p className="text-2xl font-bold text-warning">{formatCurrency(billingData?.totalPending)}</p>
        </div>
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
            <span className="text-sm font-medium text-error">Overdue Amount</span>
          </div>
          <p className="text-2xl font-bold text-error">{formatCurrency(billingData?.totalOverdue)}</p>
        </div>
      </div>
      {/* Insurance Information */}
      {billingData?.insurance && (
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Shield" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Insurance Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Provider</label>
              <p className="text-foreground font-medium">{billingData?.insurance?.provider}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Policy Number</label>
              <p className="text-foreground font-medium">{billingData?.insurance?.policyNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Coverage</label>
              <p className="text-foreground font-medium">{billingData?.insurance?.coverage}%</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Claimed Amount</label>
              <p className="text-foreground font-medium">{formatCurrency(billingData?.insurance?.claimedAmount)}</p>
            </div>
          </div>
        </div>
      )}
      {/* Invoice List */}
      <div className="space-y-4">
        {filteredInvoices?.length > 0 ? (
          filteredInvoices?.map((invoice, index) => (
            <InvoiceCard key={index} invoice={invoice} />
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="Receipt" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No invoices found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterStatus !== 'all' ?'Try adjusting your search or filter criteria.' :'No billing records available for this patient.'
              }
            </p>
          </div>
        )}
      </div>
      {/* Generate New Invoice Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Generate New Invoice
        </Button>
      </div>
      {/* Invoice Detail Modal */}
      <InvoiceDetailModal 
        invoice={selectedInvoice} 
        onClose={() => setSelectedInvoice(null)} 
      />
    </div>
  );
};

export default BillingTab;