import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunicationHistoryTab = ({ communicationHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedCommunication, setSelectedCommunication] = useState(null);

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'appointment':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'feedback':
        return 'bg-success/10 text-success border-success/20';
      case 'inquiry':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'complaint':
        return 'bg-error/10 text-error border-error/20';
      case 'follow-up':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'appointment':
        return 'Calendar';
      case 'feedback':
        return 'MessageSquare';
      case 'inquiry':
        return 'HelpCircle';
      case 'complaint':
        return 'AlertTriangle';
      case 'follow-up':
        return 'Phone';
      case 'email':
        return 'Mail';
      case 'sms':
        return 'MessageCircle';
      case 'call':
        return 'Phone';
      default:
        return 'MessageSquare';
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

  const filteredCommunications = communicationHistory?.filter(comm => {
    const matchesSearch = comm?.subject?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         comm?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         comm?.from?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesType = filterType === 'all' || comm?.type?.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  const CommunicationCard = ({ communication }) => (
    <div className="bg-card rounded-lg border p-6 hover:shadow-elevated transition-gentle">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${getTypeColor(communication?.type)}`}>
                <Icon name={getTypeIcon(communication?.type)} size={16} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{communication?.subject}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span>From: {communication?.from}</span>
                  <span>•</span>
                  <span>{communication?.date}</span>
                  <span>•</span>
                  <span>{communication?.time}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(communication?.priority)}`}>
                {communication?.priority}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(communication?.type)}`}>
                {communication?.type}
              </span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-foreground line-clamp-3">{communication?.content}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="User" size={14} />
                <span>Handled by: {communication?.handledBy}</span>
              </div>
              {communication?.responseTime && (
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  <span>Response time: {communication?.responseTime}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Icon name={communication?.channel === 'email' ? 'Mail' : communication?.channel === 'phone' ? 'Phone' : 'MessageCircle'} size={14} />
                <span>{communication?.channel}</span>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              communication?.status === 'Resolved' ?'bg-success/10 text-success border border-success/20' 
                : communication?.status === 'Pending' ?'bg-warning/10 text-warning border border-warning/20' :'bg-primary/10 text-primary border border-primary/20'
            }`}>
              {communication?.status}
            </div>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedCommunication(communication)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Full
          </Button>
          {communication?.status === 'Pending' && (
            <Button
              variant="default"
              size="sm"
              iconName="Reply"
              iconPosition="left"
              iconSize={14}
            >
              Reply
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const CommunicationDetailModal = ({ communication, onClose }) => {
    if (!communication) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{communication?.subject}</h2>
              <p className="text-sm text-muted-foreground">
                {communication?.type} • {communication?.date} at {communication?.time}
              </p>
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
            {/* Communication Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">From</label>
                <p className="text-sm font-semibold text-foreground mt-1">{communication?.from}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Channel</label>
                <div className="flex items-center gap-2 mt-1">
                  <Icon name={getTypeIcon(communication?.channel)} size={16} />
                  <span className="text-sm font-semibold text-foreground capitalize">{communication?.channel}</span>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Priority</label>
                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(communication?.priority)}`}>
                  {communication?.priority}
                </span>
              </div>
            </div>

            {/* Full Content */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Message Content</h3>
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="prose prose-sm max-w-none text-foreground">
                  {communication?.fullContent?.split('\n')?.map((paragraph, index) => (
                    <p key={index} className="mb-4 text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  )) || (
                    <p className="text-sm leading-relaxed">{communication?.content}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Attachments */}
            {communication?.attachments && communication?.attachments?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Attachments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {communication?.attachments?.map((attachment, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-4 flex items-center gap-3">
                      <Icon name="Paperclip" size={20} color="var(--color-primary)" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{attachment?.name}</p>
                        <p className="text-xs text-muted-foreground">{attachment?.size} • {attachment?.type}</p>
                      </div>
                      <Button variant="ghost" size="icon" iconName="Download" iconSize={16} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Response History */}
            {communication?.responses && communication?.responses?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Response History</h3>
                <div className="space-y-4">
                  {communication?.responses?.map((response, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Reply" size={16} color="var(--color-primary)" />
                          <span className="font-medium text-foreground">{response?.from}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{response?.date} at {response?.time}</span>
                      </div>
                      <p className="text-sm text-foreground">{response?.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              {communication?.status === 'Pending' && (
                <>
                  <Button variant="outline" iconName="Reply" iconPosition="left" iconSize={16}>
                    Reply
                  </Button>
                  <Button variant="default" iconName="CheckCircle" iconPosition="left" iconSize={16}>
                    Mark as Resolved
                  </Button>
                </>
              )}
              <Button variant="ghost" iconName="Archive" iconPosition="left" iconSize={16}>
                Archive
              </Button>
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
            placeholder="Search communications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-muted-foreground)" />
          <span className="text-sm font-medium text-foreground">Filter:</span>
          <div className="flex flex-wrap gap-2">
            {['all', 'appointment', 'feedback', 'inquiry', 'complaint', 'follow-up']?.map((type) => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType(type)}
              >
                {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Communication Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Total</span>
          </div>
          <p className="text-2xl font-bold text-primary">{communicationHistory?.length}</p>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={20} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">Pending</span>
          </div>
          <p className="text-2xl font-bold text-warning">
            {communicationHistory?.filter(c => c?.status === 'Pending')?.length}
          </p>
        </div>
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Resolved</span>
          </div>
          <p className="text-2xl font-bold text-success">
            {communicationHistory?.filter(c => c?.status === 'Resolved')?.length}
          </p>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
            <span className="text-sm font-medium text-accent">This Month</span>
          </div>
          <p className="text-2xl font-bold text-accent">
            {communicationHistory?.filter(c => {
              const commDate = new Date(c.date);
              const currentMonth = new Date()?.getMonth();
              return commDate?.getMonth() === currentMonth;
            })?.length}
          </p>
        </div>
      </div>
      {/* Communication List */}
      <div className="space-y-4">
        {filteredCommunications?.length > 0 ? (
          filteredCommunications?.map((communication, index) => (
            <CommunicationCard key={index} communication={communication} />
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="MessageSquare" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No communications found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterType !== 'all' ?'Try adjusting your search or filter criteria.' :'No communication history available for this patient.'
              }
            </p>
          </div>
        )}
      </div>
      {/* Communication Detail Modal */}
      <CommunicationDetailModal 
        communication={selectedCommunication} 
        onClose={() => setSelectedCommunication(null)} 
      />
    </div>
  );
};

export default CommunicationHistoryTab;