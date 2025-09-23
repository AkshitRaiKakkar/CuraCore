import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentSessions = () => {
  const [expandedSession, setExpandedSession] = useState(null);

  const recentSessions = [
    {
      id: 1,
      date: '2024-03-19',
      time: '10:00 AM',
      therapist: 'Dr. Priya Sharma',
      treatment: 'Abhyanga Massage',
      duration: '60 min',
      status: 'completed',
      rating: 5,
      notes: `Excellent session today. Patient showed significant improvement in mobility and reported reduced back pain. The Abhyanga massage was well-received with proper oil temperature and pressure.\n\nRecommendations for next session:\n- Continue with current oil blend\n- Focus on lower back region\n- Patient can increase activity level gradually`,
      feedback: `Amazing session! I felt immediate relief in my back pain. Dr. Priya was very attentive and the massage technique was perfect. The oil blend used was very soothing.`,
      nextSession: '2024-03-22',
      improvements: ['Reduced pain level from 7/10 to 3/10', 'Improved range of motion', 'Better sleep quality']
    },
    {
      id: 2,
      date: '2024-03-15',
      time: '2:30 PM',
      therapist: 'Dr. Rajesh Kumar',
      treatment: 'Shirodhara',
      duration: '45 min',
      status: 'completed',
      rating: 4,
      notes: `Good Shirodhara session. Patient was relaxed throughout the procedure. Oil flow was consistent and temperature was maintained properly.\n\nObservations:\n- Patient showed signs of deep relaxation\n- No adverse reactions to the oil\n- Reported feeling calm and refreshed post-treatment`,
      feedback: `Very relaxing session. The oil temperature was perfect and I felt very calm afterwards. Dr. Rajesh explained the process well.`,
      nextSession: '2024-03-18',
      improvements: ['Reduced stress levels', 'Better mental clarity', 'Improved concentration']
    },
    {
      id: 3,
      date: '2024-03-12',
      time: '11:15 AM',
      therapist: 'Dr. Priya Sharma',
      treatment: 'Panchakarma Consultation',
      duration: '30 min',
      status: 'completed',
      rating: 5,
      notes: `Mid-treatment consultation completed. Patient progress is excellent and on track with treatment plan.\n\nProgress Review:\n- 75% treatment completion\n- All milestones achieved on schedule\n- Patient compliance is excellent\n- No side effects reported`,
      feedback: `Great consultation. Dr. Priya explained my progress clearly and I'm happy with the results so far.`,nextSession: '2024-03-15',
      improvements: ['Overall health improvement', 'Better energy levels', 'Positive treatment response']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'in-progress':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
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

  const toggleExpanded = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  const handleRateSession = (sessionId) => {
    alert(`Rating system would open for session ${sessionId}`);
  };

  return (
    <div className="bg-card rounded-lg border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Sessions</h3>
          <p className="text-sm text-muted-foreground">Your completed therapy sessions and notes</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="History"
          iconPosition="left"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {recentSessions?.map((session) => (
          <div
            key={session?.id}
            className="border rounded-lg p-4 bg-surface hover:shadow-soft transition-gentle"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={18} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-foreground">{session?.treatment}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session?.status)}`}>
                      {session?.status?.charAt(0)?.toUpperCase() + session?.status?.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      {new Date(session.date)?.toLocaleDateString('en-IN')}
                    </div>
                    <div className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {session?.time} • {session?.duration}
                    </div>
                    <div className="flex items-center">
                      <Icon name="User" size={14} className="mr-1" />
                      {session?.therapist}
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center space-x-1 mr-2">
                        {renderStars(session?.rating)}
                      </div>
                      <span>{session?.rating}/5</span>
                    </div>
                  </div>

                  {/* Improvements */}
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-foreground mb-2">Key Improvements:</h5>
                    <div className="flex flex-wrap gap-2">
                      {session?.improvements?.map((improvement, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-success/10 text-success text-xs rounded-full"
                        >
                          {improvement}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedSession === session?.id && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Therapist Notes:</h5>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                            {session?.notes}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Your Feedback:</h5>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                          <p className="text-sm text-foreground leading-relaxed">
                            {session?.feedback}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Next Session: {new Date(session.nextSession)?.toLocaleDateString('en-IN')}
                        </span>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleRateSession(session?.id)}
                          iconName="Star"
                          iconPosition="left"
                          iconSize={12}
                        >
                          Update Rating
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleExpanded(session?.id)}
                iconName={expandedSession === session?.id ? "ChevronUp" : "ChevronDown"}
                iconSize={16}
              />
            </div>
          </div>
        ))}
      </div>
      {recentSessions?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h4 className="font-medium text-foreground mb-2">No Recent Sessions</h4>
          <p className="text-sm text-muted-foreground">
            Your completed therapy sessions will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentSessions;