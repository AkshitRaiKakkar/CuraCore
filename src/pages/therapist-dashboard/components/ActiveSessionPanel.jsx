import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ActiveSessionPanel = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [sessionNotes, setSessionNotes] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [currentMilestone, setCurrentMilestone] = useState('');

  // Mock active session data
  const mockActiveSession = {
    id: 1,
    patientName: "Priya Sharma",
    treatmentType: "Shirodhara",
    startTime: new Date(Date.now() - 1800000), // Started 30 minutes ago
    duration: 45,
    sessionNumber: 1,
    totalSessions: 7,
    patientId: "P002",
    vitalSigns: {
      bloodPressure: "120/80",
      heartRate: 72,
      temperature: 98.6
    }
  };

  useEffect(() => {
    // Simulate active session
    setActiveSession(mockActiveSession);
    
    // Timer for active session
    const timer = setInterval(() => {
      if (activeSession) {
        const elapsed = Math.floor((Date.now() - activeSession?.startTime?.getTime()) / 1000);
        setSessionTimer(elapsed);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSession]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleAddMilestone = () => {
    if (currentMilestone?.trim()) {
      const newMilestone = {
        id: Date.now(),
        text: currentMilestone,
        timestamp: new Date(),
        type: 'progress'
      };
      setMilestones([...milestones, newMilestone]);
      setCurrentMilestone('');
    }
  };

  const handleCompleteSession = () => {
    console.log('Completing session with notes:', sessionNotes);
    console.log('Milestones:', milestones);
    setActiveSession(null);
    setSessionTimer(0);
    setSessionNotes('');
    setMilestones([]);
  };

  const handlePauseSession = () => {
    console.log('Pausing session');
  };

  const handleEmergencyStop = () => {
    console.log('Emergency stop activated');
  };

  if (!activeSession) {
    return (
      <div className="bg-card rounded-lg border shadow-soft">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Play" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Active Session</h3>
          <p className="text-muted-foreground mb-4">Start a session to begin tracking progress</p>
          <Button variant="default" iconName="Play" iconPosition="left">
            Start New Session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border shadow-soft">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Icon name="Activity" size={20} color="var(--color-success)" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Active Session</h2>
              <p className="text-sm text-muted-foreground">Real-time progress tracking</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
              <Icon name="Circle" size={8} className="inline mr-2 fill-current" />
              Live
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Session Info */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium text-foreground">{activeSession?.patientName}</h3>
              <p className="text-sm text-muted-foreground">{activeSession?.treatmentType}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-primary">{formatTime(sessionTimer)}</div>
              <div className="text-xs text-muted-foreground">
                Session {activeSession?.sessionNumber}/{activeSession?.totalSessions}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 bg-card rounded">
              <div className="text-sm font-medium text-foreground">{activeSession?.vitalSigns?.bloodPressure}</div>
              <div className="text-xs text-muted-foreground">BP (mmHg)</div>
            </div>
            <div className="p-2 bg-card rounded">
              <div className="text-sm font-medium text-foreground">{activeSession?.vitalSigns?.heartRate}</div>
              <div className="text-xs text-muted-foreground">HR (bpm)</div>
            </div>
            <div className="p-2 bg-card rounded">
              <div className="text-sm font-medium text-foreground">{activeSession?.vitalSigns?.temperature}°F</div>
              <div className="text-xs text-muted-foreground">Temp</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Session Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.min(Math.floor((sessionTimer / 60) / activeSession?.duration * 100), 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min((sessionTimer / 60) / activeSession?.duration * 100, 100)}%` 
              }}
            />
          </div>
        </div>

        {/* Milestone Recording */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Record Milestone</h4>
          <div className="flex space-x-2 mb-3">
            <Input
              type="text"
              placeholder="Enter milestone or observation..."
              value={currentMilestone}
              onChange={(e) => setCurrentMilestone(e?.target?.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleAddMilestone}
              iconName="Plus"
              iconSize={16}
              disabled={!currentMilestone?.trim()}
            >
              Add
            </Button>
          </div>
          
          {milestones?.length > 0 && (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {milestones?.map((milestone) => (
                <div key={milestone?.id} className="flex items-start space-x-2 p-2 bg-muted/30 rounded text-sm">
                  <Icon name="CheckCircle2" size={14} color="var(--color-success)" className="mt-0.5" />
                  <div className="flex-1">
                    <p className="text-foreground">{milestone?.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {milestone?.timestamp?.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Session Notes */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Session Notes</h4>
          <textarea
            className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            rows={4}
            placeholder="Enter session observations, patient feedback, and treatment notes..."
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e?.target?.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button
            variant="success"
            onClick={handleCompleteSession}
            iconName="CheckCircle"
            iconPosition="left"
            iconSize={16}
          >
            Complete Session
          </Button>
          <Button
            variant="warning"
            onClick={handlePauseSession}
            iconName="Pause"
            iconPosition="left"
            iconSize={16}
          >
            Pause
          </Button>
          <Button
            variant="destructive"
            onClick={handleEmergencyStop}
            iconName="AlertTriangle"
            iconPosition="left"
            iconSize={16}
          >
            Emergency Stop
          </Button>
          <Button
            variant="outline"
            iconName="Phone"
            iconSize={16}
          >
            Emergency Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveSessionPanel;