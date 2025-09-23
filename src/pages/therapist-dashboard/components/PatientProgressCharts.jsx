import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientProgressCharts = () => {
  const [selectedPatient, setSelectedPatient] = useState('P002');
  const [chartType, setChartType] = useState('progress');

  const patients = [
    { id: 'P002', name: 'Priya Sharma', treatment: 'Shirodhara' },
    { id: 'P001', name: 'Rajesh Kumar', treatment: 'Abhyanga' },
    { id: 'P003', name: 'Amit Patel', treatment: 'Panchakarma Detox' }
  ];

  const progressData = [
    { session: 1, painLevel: 8, mobility: 3, satisfaction: 6, date: '2025-01-15' },
    { session: 2, painLevel: 7, mobility: 4, satisfaction: 7, date: '2025-01-17' },
    { session: 3, painLevel: 6, mobility: 5, satisfaction: 8, date: '2025-01-19' },
    { session: 4, painLevel: 5, mobility: 6, satisfaction: 8, date: '2025-01-21' },
    { session: 5, painLevel: 4, mobility: 7, satisfaction: 9, date: '2025-01-23' }
  ];

  const feedbackData = [
    { category: 'Pain Relief', score: 85, sessions: 12 },
    { category: 'Mobility', score: 78, sessions: 12 },
    { category: 'Sleep Quality', score: 92, sessions: 12 },
    { category: 'Energy Level', score: 76, sessions: 12 },
    { category: 'Overall Satisfaction', score: 88, sessions: 12 }
  ];

  const adherenceData = [
    { name: 'Completed', value: 85, color: 'var(--color-success)' },
    { name: 'Missed', value: 10, color: 'var(--color-error)' },
    { name: 'Rescheduled', value: 5, color: 'var(--color-warning)' }
  ];

  const treatmentOutcomes = [
    { week: 'Week 1', improvement: 15, target: 20 },
    { week: 'Week 2', improvement: 28, target: 35 },
    { week: 'Week 3', improvement: 45, target: 50 },
    { week: 'Week 4', improvement: 62, target: 65 },
    { week: 'Week 5', improvement: 78, target: 80 }
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'progress':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="session" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="painLevel" 
                  stroke="var(--color-error)" 
                  strokeWidth={2}
                  name="Pain Level"
                />
                <Line 
                  type="monotone" 
                  dataKey="mobility" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="Mobility Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  name="Satisfaction"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'feedback':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feedbackData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  type="number" 
                  domain={[0, 100]}
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  type="category" 
                  dataKey="category" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  width={120}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="score" 
                  fill="var(--color-primary)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'adherence':
        return (
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={adherenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {adherenceData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case 'outcomes':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={treatmentOutcomes}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="week" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="improvement" 
                  fill="var(--color-primary)"
                  name="Actual Improvement"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="target" 
                  fill="var(--color-muted)"
                  name="Target"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch (chartType) {
      case 'progress':
        return 'Treatment Progress Over Time';
      case 'feedback':
        return 'Patient Feedback Scores';
      case 'adherence':
        return 'Treatment Plan Adherence';
      case 'outcomes':
        return 'Treatment Outcomes vs Targets';
      default:
        return 'Patient Progress';
    }
  };

  const getChartDescription = () => {
    switch (chartType) {
      case 'progress':
        return 'Track pain levels, mobility improvements, and patient satisfaction across sessions';
      case 'feedback':
        return 'Patient-reported outcomes across different treatment categories';
      case 'adherence':
        return 'Session attendance and treatment plan compliance rates';
      case 'outcomes':
        return 'Actual improvement percentages compared to treatment targets';
      default:
        return 'Visual representation of patient progress metrics';
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-soft">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{getChartTitle()}</h2>
              <p className="text-sm text-muted-foreground">{getChartDescription()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e?.target?.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {patients?.map((patient) => (
                <option key={patient?.id} value={patient?.id}>
                  {patient?.name} - {patient?.treatment}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm" iconName="Download" iconSize={16}>
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Chart Type Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={chartType === 'progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('progress')}
            iconName="Activity"
            iconPosition="left"
            iconSize={14}
          >
            Progress
          </Button>
          <Button
            variant={chartType === 'feedback' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('feedback')}
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={14}
          >
            Feedback
          </Button>
          <Button
            variant={chartType === 'adherence' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('adherence')}
            iconName="PieChart"
            iconPosition="left"
            iconSize={14}
          >
            Adherence
          </Button>
          <Button
            variant={chartType === 'outcomes' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('outcomes')}
            iconName="Target"
            iconPosition="left"
            iconSize={14}
          >
            Outcomes
          </Button>
        </div>

        {/* Chart Display */}
        <div className="w-full" aria-label={`${getChartTitle()} Chart`}>
          {renderChart()}
        </div>

        {/* Chart Legend/Summary */}
        {chartType === 'progress' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-error/10 rounded-lg text-center">
              <div className="text-lg font-semibold text-error">4.0</div>
              <div className="text-sm text-muted-foreground">Current Pain Level</div>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg text-center">
              <div className="text-lg font-semibold text-primary">7.0</div>
              <div className="text-sm text-muted-foreground">Mobility Score</div>
            </div>
            <div className="p-3 bg-success/10 rounded-lg text-center">
              <div className="text-lg font-semibold text-success">9.0</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rating</div>
            </div>
          </div>
        )}

        {chartType === 'adherence' && (
          <div className="mt-6 flex justify-center">
            <div className="flex flex-wrap gap-4">
              {adherenceData?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-sm text-foreground">{item?.name}: {item?.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProgressCharts;