import {
    HealthGroup,
    MedicalHealth,
    MedicalHealthOption,
    MedicalHealthRecommendation,
    PhysicalHealth,
    PhysicalHealthRecommendation,
    SocialHealth,
    SocialHealthIndicator,
    SocialHealthRecommendation,
    Student
} from '@prisma/client'

declare global {
    type HealthComponentData =
        | (Student & {
              physicalHealth: {
                  healthGroup: HealthGroup | null
                  recommendations: PhysicalHealthRecommendation[]
                  specialistNotes: string | null
              } | null
              medicalHealth: {
                  options: MedicalHealthOption[]
                  recommendations: MedicalHealthRecommendation[]
                  specialistNotes: string | null
              } | null
              socialHealth: {
                  indicators: SocialHealthIndicator[]
                  recommendations: SocialHealthRecommendation[]
              } | null
          })
        | null
}
