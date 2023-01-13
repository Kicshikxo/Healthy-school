import {
    HealthGroup,
    MedicalHealth,
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
                  studentId: string | null
              } | null
              socialHealth: {
                  indicators: SocialHealthIndicator[]
                  recommendations: SocialHealthRecommendation[]
              } | null
          })
        | null
}
