import React from 'react';
import Icon from '../../../components/AppIcon';

const TreatmentSummary = () => {
  const summaryData = {
    totalSessions: 16,
    completedSessions: 12,
    upcomingSessions: 4,
    currentPhase: 'Mid Treatment',
    nextMilestone: 'Recovery Phase',
    averageRating: 4.8,
    lastSessionDate: '2024-03-19',
    treatmentStartDate: '2024-01-15',
    estimatedCompletion: '2024-04-15'
  };

  const therapyTypes = [
    { name: 'Abhyanga', sessions: 6, color: 'bg-primary' },
    { name: 'Shirodhara', sessions: 4, color: 'bg-secondary' },
    { name: 'Panchakarma', sessions: 3, color: 'bg-accent' },
    { name: 'Consultation', sessions: 3, color: 'bg-success' }
  ];

  const recentFeedback = [
    {
      id: 1,
      date: '2024-03-19',
      rating: 5,
      comment: `Excellent session today. The Abhyanga massage was very relaxing and I felt immediate relief in my back pain. Dr. Priya was very attentive to my needs.`,
      therapist: 'Dr. Priya Sharma'
    },
    {
      id: 2,
      date: '2024-03-15',
      rating: 4,
      comment: `Good Shirodhara session. The oil temperature was perfect and I felt very calm afterwards. Looking forward to the next session.`,
      therapist: 'Dr. Rajesh Kumar'
    }
  ];

  const calculateProgress = () => {
    return Math.round((summaryData?.completedSessions / summaryData?.totalSessions) * 100);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        color={index < rating ? "var(--color-accent)" : "var(--color-muted)"}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
              <p className="text-2xl font-bold text-foreground">{summaryData?.totalSessions}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Activity" size={20} color="var(--color-primary)" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-success">{summaryData?.completedSessions}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold text-warning">{summaryData?.upcomingSessions}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-2xl font-bold text-accent">{summaryData?.averageRating}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="Star" size={20} color="var(--color-accent)" />
            </div>
          </div>
        </div>
      </div>
      {/* Treatment Progress */}
      <div className="bg-card rounded-lg border p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">Treatment Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Phase</span>
                <span className="font-medium text-foreground">{summaryData?.currentPhase}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Milestone</span>
                <span className="font-medium text-primary">{summaryData?.nextMilestone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Started</span>
                <span className="font-medium text-foreground">
                  {new Date(summaryData.treatmentStartDate)?.toLocaleDateString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Session</span>
                <span className="font-medium text-foreground">
                  {new Date(summaryData.lastSessionDate)?.toLocaleDateString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Est. Completion</span>
                <span className="font-medium text-success">
                  {new Date(summaryData.estimatedCompletion)?.toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Therapy Types Distribution */}
      <div className="bg-card rounded-lg border p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">Therapy Distribution</h3>
        <div className="space-y-3">
          {therapyTypes?.map((therapy, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${therapy?.color}`} />
                <span className="text-sm font-medium text-foreground">{therapy?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{therapy?.sessions} sessions</span>
                <div className="w-16 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${therapy?.color}`}
                    style={{ width: `${(therapy?.sessions / summaryData?.totalSessions) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Feedback */}
      <div className="bg-card rounded-lg border p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Feedback</h3>
        <div className="space-y-4">
          {recentFeedback?.map((feedback) => (
            <div key={feedback?.id} className="border-l-4 border-primary pl-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(feedback?.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(feedback.date)?.toLocaleDateString('en-IN')}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{feedback?.therapist}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{feedback?.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentSummary;