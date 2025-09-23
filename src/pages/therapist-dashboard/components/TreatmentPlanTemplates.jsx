import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TreatmentPlanTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizationMode, setCustomizationMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const treatmentTemplates = [
    {
      id: 1,
      name: 'Stress Relief Package',
      category: 'Mental Wellness',
      duration: '14 days',
      sessions: 7,
      treatments: ['Shirodhara', 'Abhyanga', 'Meditation'],
      description: 'Comprehensive stress management through traditional Ayurvedic therapies',
      conditions: ['Anxiety', 'Insomnia', 'Work Stress'],
      estimatedCost: '₹15,000',
      popularity: 95,
      lastUpdated: '2025-01-15'
    },
    {
      id: 2,
      name: 'Joint Pain Management',
      category: 'Orthopedic',
      duration: '21 days',
      sessions: 14,
      treatments: ['Abhyanga', 'Swedana', 'Pizhichil'],
      description: 'Targeted therapy for joint pain and mobility improvement',
      conditions: ['Arthritis', 'Joint Stiffness', 'Muscle Pain'],
      estimatedCost: '₹25,000',
      popularity: 88,
      lastUpdated: '2025-01-18'
    },
    {
      id: 3,
      name: 'Detox & Rejuvenation',
      category: 'Panchakarma',
      duration: '28 days',
      sessions: 21,
      treatments: ['Virechana', 'Basti', 'Nasya', 'Abhyanga'],
      description: 'Complete body detoxification and rejuvenation program',
      conditions: ['Toxin Buildup', 'Digestive Issues', 'Low Energy'],
      estimatedCost: '₹45,000',
      popularity: 92,
      lastUpdated: '2025-01-20'
    },
    {
      id: 4,
      name: 'Skin & Beauty Care',
      category: 'Cosmetic',
      duration: '10 days',
      sessions: 8,
      treatments: ['Udvartana', 'Mukhalepam', 'Abhyanga'],
      description: 'Natural skin enhancement and beauty treatments',
      conditions: ['Skin Problems', 'Aging', 'Dull Complexion'],
      estimatedCost: '₹12,000',
      popularity: 78,
      lastUpdated: '2025-01-12'
    },
    {
      id: 5,
      name: 'Weight Management',
      category: 'Metabolic',
      duration: '30 days',
      sessions: 20,
      treatments: ['Udvartana', 'Medicated Steam', 'Diet Counseling'],
      description: 'Holistic approach to healthy weight management',
      conditions: ['Obesity', 'Metabolic Disorders', 'Poor Digestion'],
      estimatedCost: '₹30,000',
      popularity: 85,
      lastUpdated: '2025-01-16'
    }
  ];

  const categories = [...new Set(treatmentTemplates.map(t => t.category))];

  const filteredTemplates = treatmentTemplates?.filter(template =>
    template?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    template?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    template?.conditions?.some(condition => 
      condition?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  );

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setCustomizationMode(false);
  };

  const handleCustomizeTemplate = () => {
    setCustomizationMode(true);
  };

  const handleApplyTemplate = () => {
    console.log('Applying template:', selectedTemplate);
    // In a real app, this would apply the template to a patient's treatment plan
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Mental Wellness': 'bg-primary/10 text-primary border-primary/20',
      'Orthopedic': 'bg-warning/10 text-warning border-warning/20',
      'Panchakarma': 'bg-success/10 text-success border-success/20',
      'Cosmetic': 'bg-accent/10 text-accent border-accent/20',
      'Metabolic': 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colorMap?.[category] || 'bg-muted/10 text-muted-foreground border-border';
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 90) return 'text-success';
    if (popularity >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border shadow-soft">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Icon name="FileTemplate" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Treatment Plan Templates</h2>
              <p className="text-sm text-muted-foreground">Pre-configured therapy plans for rapid customization</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Plus" iconSize={16}>
            Create Template
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search templates by name, category, or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" iconName="Filter" iconSize={14}>
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="SortDesc" iconSize={14}>
              Sort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Templates List */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground mb-3">Available Templates ({filteredTemplates?.length})</h3>
            
            {filteredTemplates?.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} color="var(--color-muted-foreground)" />
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">No templates found</h4>
                <p className="text-muted-foreground">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTemplates?.map((template) => (
                  <div
                    key={template?.id}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-soft ${
                      selectedTemplate?.id === template?.id ? 'ring-2 ring-primary/20 border-primary/30' : ''
                    }`}
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{template?.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(template?.category)}`}>
                            {template?.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} color="var(--color-warning)" />
                            <span className={`text-xs font-medium ${getPopularityColor(template?.popularity)}`}>
                              {template?.popularity}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary">{template?.estimatedCost}</div>
                        <div className="text-xs text-muted-foreground">{template?.duration}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{template?.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Sessions:</span>
                        <span className="ml-1 font-medium text-foreground">{template?.sessions}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Treatments:</span>
                        <span className="ml-1 font-medium text-foreground">{template?.treatments?.length}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      {template?.conditions?.slice(0, 3)?.map((condition, index) => (
                        <span key={index} className="px-2 py-1 bg-muted/50 text-xs rounded">
                          {condition}
                        </span>
                      ))}
                      {template?.conditions?.length > 3 && (
                        <span className="px-2 py-1 bg-muted/50 text-xs rounded">
                          +{template?.conditions?.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Template Details */}
          <div>
            {selectedTemplate ? (
              <div className="bg-muted/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Template Details</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCustomizeTemplate}
                    iconName="Edit"
                    iconSize={14}
                  >
                    Customize
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{selectedTemplate?.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedTemplate?.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-card rounded-lg">
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-medium text-foreground">{selectedTemplate?.duration}</div>
                    </div>
                    <div className="p-3 bg-card rounded-lg">
                      <div className="text-sm text-muted-foreground">Sessions</div>
                      <div className="font-medium text-foreground">{selectedTemplate?.sessions}</div>
                    </div>
                    <div className="p-3 bg-card rounded-lg">
                      <div className="text-sm text-muted-foreground">Category</div>
                      <div className="font-medium text-foreground">{selectedTemplate?.category}</div>
                    </div>
                    <div className="p-3 bg-card rounded-lg">
                      <div className="text-sm text-muted-foreground">Cost</div>
                      <div className="font-medium text-primary">{selectedTemplate?.estimatedCost}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Treatments Included</h5>
                    <div className="space-y-2">
                      {selectedTemplate?.treatments?.map((treatment, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-card rounded">
                          <Icon name="Check" size={14} color="var(--color-success)" />
                          <span className="text-sm text-foreground">{treatment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Recommended For</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate?.conditions?.map((condition, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button
                      variant="default"
                      fullWidth
                      onClick={handleApplyTemplate}
                      iconName="Plus"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Apply Template to Patient
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/20 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="FileTemplate" size={24} color="var(--color-muted-foreground)" />
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">Select a Template</h4>
                <p className="text-muted-foreground">Choose a treatment plan template to view details and customize</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlanTemplates;