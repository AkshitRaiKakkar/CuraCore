import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TreatmentHistoryTab = ({ treatmentHistory }) => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'scheduled':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  const filteredTreatments = treatmentHistory?.filter(treatment => 
    filterStatus === 'all' || treatment?.status?.toLowerCase() === filterStatus
  );

  const TreatmentCard = ({ treatment }) => (
    <div className="bg-card rounded-lg border p-6 hover:shadow-elevated transition-gentle">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{treatment?.name}</h3>
              <p className="text-sm text-muted-foreground">{treatment?.type}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(treatment?.status)}`}>
              {treatment?.status}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground">Start Date</label>
              <p className="text-sm font-medium text-foreground">{treatment?.startDate}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">End Date</label>
              <p className="text-sm font-medium text-foreground">{treatment?.endDate || 'Ongoing'}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Therapist</label>
              <p className="text-sm font-medium text-foreground">Dr. {treatment?.therapist}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Sessions</label>
              <p className="text-sm font-medium text-foreground">
                {treatment?.completedSessions}/{treatment?.totalSessions}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-muted-foreground">Progress</label>
              <span className="text-xs font-medium text-foreground">{treatment?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(treatment?.progress)}`}
                style={{ width: `${treatment?.progress}%` }}
              />
            </div>
          </div>

          {/* Treatment Goals */}
          {treatment?.goals && treatment?.goals?.length > 0 && (
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-2 block">Treatment Goals</label>
              <div className="flex flex-wrap gap-2">
                {treatment?.goals?.map((goal, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Latest Notes */}
          {treatment?.latestNotes && (
            <div className="bg-muted/30 rounded-lg p-3">
              <label className="text-xs text-muted-foreground">Latest Notes</label>
              <p className="text-sm text-foreground mt-1">{treatment?.latestNotes}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Updated on {treatment?.lastUpdated}
              </p>
            </div>
          )}
        </div>

        <div className="flex lg:flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedTreatment(treatment)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Details
          </Button>
          {treatment?.status === 'In-Progress' && (
            <Button
              variant="default"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              iconSize={14}
            >
              Schedule
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const TreatmentDetailModal = ({ treatment, onClose }) => {
    if (!treatment) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-foreground">{treatment?.name}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          <div className="p-6 space-y-6">
            {/* Treatment Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Treatment Type</label>
                <p className="text-lg font-semibold text-foreground">{treatment?.type}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Duration</label>
                <p className="text-lg font-semibold text-foreground">{treatment?.duration}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <label className="text-sm font-medium text-muted-foreground">Total Cost</label>
                <p className="text-lg font-semibold text-foreground">₹{treatment?.totalCost?.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Session History */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Session History</h3>
              <div className="space-y-3">
                {treatment?.sessions?.map((session, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Session {session?.number}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(session?.status)}`}>
                        {session?.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <label className="text-muted-foreground">Date</label>
                        <p className="text-foreground">{session?.date}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Duration</label>
                        <p className="text-foreground">{session?.duration}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Therapist</label>
                        <p className="text-foreground">Dr. {session?.therapist}</p>
                      </div>
                    </div>
                    {session?.notes && (
                      <div className="mt-3 p-3 bg-background rounded border">
                        <label className="text-xs text-muted-foreground">Session Notes</label>
                        <p className="text-sm text-foreground mt-1">{session?.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            {treatment?.milestones && treatment?.milestones?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Treatment Milestones</h3>
                <div className="space-y-3">
                  {treatment?.milestones?.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        milestone?.achieved ? 'bg-success' : 'bg-muted'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          milestone?.achieved ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {milestone?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{milestone?.description}</p>
                        {milestone?.achievedDate && (
                          <p className="text-xs text-success mt-1">
                            Achieved on {milestone?.achievedDate}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
          {['all', 'completed', 'in-progress', 'scheduled', 'cancelled']?.map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
            >
              {status?.charAt(0)?.toUpperCase() + status?.slice(1)?.replace('-', ' ')}
            </Button>
          ))}
        </div>
      </div>
      {/* Treatment List */}
      <div className="space-y-4">
        {filteredTreatments?.length > 0 ? (
          filteredTreatments?.map((treatment, index) => (
            <TreatmentCard key={index} treatment={treatment} />
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No treatments found</h3>
            <p className="text-muted-foreground">
              {filterStatus === 'all' ?'No treatment history available for this patient.'
                : `No ${filterStatus?.replace('-', ' ')} treatments found.`
              }
            </p>
          </div>
        )}
      </div>
      {/* Treatment Detail Modal */}
      <TreatmentDetailModal 
        treatment={selectedTreatment} 
        onClose={() => setSelectedTreatment(null)} 
      />
    </div>
  );
};

export default TreatmentHistoryTab;