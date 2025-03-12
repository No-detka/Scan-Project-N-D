/* eslint-disable @typescript-eslint/no-explicit-any */
interface DateInterval {
  startDate: string;
  endDate: string;
}

interface RiskFactors {
  and: any[];
  or: any[];
  not: any[];
}

interface Themes {
  and: any[];
  or: any[];
  not: any[];
}

interface TargetSearchEntity {
  type: string;
  sparkId: null | number | string;
  entityId: null | number | string;
  inn: string;
  maxFullness: boolean;
  inBusinessNews: boolean;
}

interface TargetSearchEntitiesContext {
  targetSearchEntities: TargetSearchEntity[];
  onlyMainRole: boolean;
  tonality: string;
  onlyWithRiskFactors: boolean;
  riskFactors: RiskFactors;
  themes: Themes;
}

interface ThemesFilter {
  and: any[];
  or: any[];
  not: any[];
}

interface AttributeFilters {
  excludeTechNews: boolean;
  excludeAnnouncements: boolean;
  excludeDigests: boolean;
}

interface SearchArea {
  includedSources: any[];
  excludedSources: any[];
  includedSourceGroups: any[];
  excludedSourceGroups: any[];
}

interface SearchContext {
  targetSearchEntitiesContext: TargetSearchEntitiesContext;
  themesFilter: ThemesFilter;
}

export interface SearchData {
  issueDateInterval: DateInterval;
  searchContext: SearchContext;
  searchArea: SearchArea;
  attributeFilters: AttributeFilters;
  similarMode: string;
  limit: number;
  sortType: string;
  sortDirectionType: string;
  intervalType: string;
  histogramTypes: string[];
}
