import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgressChart = () => {
  const progressData = [
    { date: '2024-01-15', sessions: 2, milestone: 'Initial Assessment', progress: 10 },
    { date: '2024-01-22', sessions: 5, milestone: 'Detox Phase', progress: 25 },
    { date: '2024-02-05', sessions: 8, milestone: 'Panchakarma Start', progress: 40 },
    { date: '2024-02-19', sessions: 12, milestone: 'Mid Treatment', progress: 65 },
    { date: '2024-03-05', sessions: 16, milestone: 'Recovery Phase', progress: 85 },
    { date: '2024-03-19', sessions: 20, milestone: 'Completion', progress: 100 }
  ];

  const currentProgress = 65;
  const nextMilestone = 'Recovery Phase';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground">{`Date: ${new Date(data.date)?.toLocaleDateString('en-IN')}`}</p>
          <p className="text-primary">{`Sessions: ${data?.sessions}`}</p>
          <p className="text-secondary">{`Progress: ${data?.progress}%`}</p>
          <p className="text-sm text-muted-foreground">{`Milestone: ${data?.milestone}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Treatment Progress</h3>
          <p className="text-sm text-muted-foreground">Your Panchakarma journey visualization</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{currentProgress}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Current Phase</span>
          <span className="font-medium text-foreground">Next: {nextMilestone}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={progressData}>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#progressGradient)"
            />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="var(--color-secondary)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">16</div>
          <div className="text-xs text-muted-foreground">Sessions Done</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-secondary">4</div>
          <div className="text-xs text-muted-foreground">Remaining</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-accent">4.8</div>
          <div className="text-xs text-muted-foreground">Avg Rating</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;