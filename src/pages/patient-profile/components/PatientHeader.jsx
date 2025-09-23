import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PatientHeader = ({ patient, onEdit, canEdit = false }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (onEdit) onEdit(!isEditing);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-soft p-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Patient Photo */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-muted">
              <Image
                src={patient?.photo || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"}
                alt={`${patient?.name} profile photo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient?.status)}`}>
              {patient?.status}
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">
                  {patient?.name}
                </h1>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span className="text-sm">Age {patient?.age}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="User" size={16} />
                  <span>ID: {patient?.patientId}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Users" size={16} />
                  <span>{patient?.gender}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Phone" size={16} />
                  <span>{patient?.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Icon name="Mail" size={16} />
                <span>{patient?.email}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {canEdit && (
              <div className="flex items-center gap-2">
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={handleEditToggle}
                  iconName={isEditing ? "Check" : "Edit"}
                  iconPosition="left"
                  iconSize={16}
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreVertical"
                  iconSize={16}
                />
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Total Sessions</div>
              <div className="text-lg font-semibold text-foreground">{patient?.totalSessions}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Completed</div>
              <div className="text-lg font-semibold text-success">{patient?.completedSessions}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Upcoming</div>
              <div className="text-lg font-semibold text-warning">{patient?.upcomingSessions}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Last Visit</div>
              <div className="text-sm font-medium text-foreground">{patient?.lastVisit}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;