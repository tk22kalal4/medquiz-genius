
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SavedConfig {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: string;
  question_count: string;
  time_limit: string;
}

interface QuizSetupFormProps {
  savedConfigs?: SavedConfig[];
}

const subjects = [
  "Complete MBBS",
  "Anatomy",
  "Physiology",
  "Biochemistry",
  "Pathology",
  "Pharmacology",
  "Microbiology",
  "FMT",
  "PSM",
  "Ophthalmology",
  "Otorhinolaryngology",
  "Medicine",
  "Surgery",
  "OBGY",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Psychiatry",
  "Radiology",
  "Anesthesiology"
];

const chapters = {
  Anatomy: ["Complete Subject", "Head & Neck", "Thorax", "Abdomen", "Upper Limb", "Lower Limb", "Neuroanatomy", "Histology", "Embryology"],
  Physiology: ["Complete Subject", "General Physiology", "Blood", "Nerve-Muscle", "CNS", "CVS", "Respiratory", "Renal", "GIT", "Endocrine", "Reproductive Physiology"],
  Biochemistry: ["Complete Subject", "Cell Biology", "Enzymology", "Carbohydrate", "Protein & Amino Acids", "Lipids", "Molecular Biology", "Vitamins & Minerals", "Bioenergetics"],
  Pathology: ["Complete Subject", "General Pathology", "Hematology", "Cardiovascular System", "Genitourinary System", "Gastrointestinal System", "Respiratory System", "Endocrine System and Breast", "Skin and Musculoskeletal system", "Nervous System", "Miscellaneous"],
  Pharmacology: ["Complete Subject", "General Pharmacology", "Autonomic Nervous System", "Cardiovascular System", "CNS Pharmacology", "Chemotherapy", "Endocrine Pharmacology", "GIT Pharmacology", "Renal Pharmacology", "Antimicrobials", "Autacoids", "Hematology", "Respiratory Pharmacology", "Immunomodulators", "Anti-Neoplastic Agent"],
  Microbiology: ["Complete Subject", "General Microbiology", "Bacteriology", "Virology", "Mycology", "Parasitology", "Immunology", "Applied Microbiology"],
  FMT: ["Complete Subject", "Forensic Pathology", "Toxicology", "Forensic Psychiatry", "Medical Jurisprudence", "Forensic Traumatology", "Sexual Jurisprudence"],
  PSM: ["Complete Subject", "Epidemiology", "Biostatistics", "Communicable Diseases", "Non-Communicable Diseases", "Environmental Health", "Occupational Health", "Health Programs in India", "Maternal & Child Health", "Demography and Family Planning", "Vaccine and Immunization", "Screening of Disease", "Healthcare Planning in India", "Nutrition", "Biomedical Waste Management", "Concept of Health and Disease", "Health Communication", "International Health Organisations", "Social Medicine"],
  Ophthalmology: ["Complete Subject", "Anatomy & Physiology of Eye", "Refraction & Optics", "Cornea", "Lens", "Retina", "Glaucoma", "Neuro-Ophthalmology", "Ocular Emergencies", "Squint", "Uvea", "Conjunctiva", "Adnexa"],
  Otorhinolaryngology: ["Complete Subject", "Ear", "Nose", "Pharynx", "Larynx"],
  Medicine: ["Complete Subject", "Cardiology", "Neurology", "Pulmonology", "Gastroenterology", "Nephrology", "Endocrinology", "Rheumatology and Immunology", "Hematology", "Infectious Diseases", "ECG", "Acid-Base Regulation", "Infectious Diseases"],
  Surgery: ["Complete Subject", "General Surgery", "Gastrointestinal and Abdominal Surgery", "Hepatobiliary Surgery", "Cardiothoracic Surgery", "Neurosurgery", "Urology", "Plastic Surgery", "Pediatric Surgery", "Endocrine System", "Speciality Surgery", "Trauma", "Hernia", "Vascular Surgery", "Faciomaxillary Surgery"],
  OBGY: ["Complete Subject", "Gynecology Infections", "General Gynecology", "Infertility and Contraception", "Fetal Medicine", "Gynecologic Oncology", "Fundamentals of Reproduction", "Normal Pregnancy and Antenatal Care", "Medical and Surgical Complications in Pregnancy", "Obstetrics", "Obstetric Complications", "Labor and Puerperium"],
  Pediatrics: ["Complete Subject", "Neonatology", "Growth & Development", "Pediatric Nutrition", "Pediatric Neurology", "Pediatric Cardiology", "Pediatric Infectious Diseases", "Genetic Disorders", "Childhood Infections", "Gastrointestinal System", "Respiratory System", "Genito-Urinary System", "Endocrine System", "Childhood Malignancies", "Paediatric Rheumatology", "Hematology", "Miscellaneous"],
  Orthopedics: ["Complete Subject", "Fractures & Dislocations", "Spine Disorders", "Pediatric Orthopedics", "Arthritis", "Bone Tumors", "Orthopedic Trauma", "Bone and Imaging", "Bone and Joint Infections", "Tuberculosis of Bone and Joints", "Orthopedics Oncology", "Peripheral Nerve Injuries", "General and Upper Limb Traumatology", "Spine, Pelvis and Lower limb Traumatology", "Complications in Orthopedics", "Metabolic Disorders", "Arthritis", "Sports Injuries", "Miscellaneous"],
  Dermatology: ["Complete Subject", "Basic Dermatology", "Infections & Infestations", "Vesiculobullous Disorders", "Autoimmune Skin Diseases", "Dermatologic Surgery", "Cutaneous Infections", "Mycobacterial Infections", "Immunobullous Disorders", "Papulosquamous Disorders", "Skin Appendages and their Disorders", "Sexually Transmitted Infections", "Eczema", "Pigmentary Disorders", "Connective Tissue Disorders", "Skin Tumors", "Systemic Diseases and Skin", "Miscellaneous"],
  Psychiatry: ["Complete Subject", "General Psychiatry", "Child Psychiatry", "Geriatric Psychiatry", "Substance Abuse", "Mood Disorders", "Schizophrenia", "Anxiety Disorders", "Neurotic,Stress-Related and Somatoform Disorders", "Substance-Related and Addictive Disorders", "Organic Mental Disorders", "Sleep Disorders", "Sexual Disorders", "Eating Disorders", "Personality Disorders", "Forensic Psychiatry", "Psychology", "Miscellaneous"],
  Radiology: ["Complete Subject", "X-ray Imaging", "CT Scan", "MRI", "Ultrasound", "Nuclear Medicine", "Interventional Radiology", "Thoracic Radiology", "Head & Neck Radiology", "Gastrointestinal Radiology", "Hepatobiliary Radiology", "Genitourinary Radiology", "OBGY Imaging", "Musculoskeletal Radiology", "Nuclear Medicine", "Radiotherapy"],
  Anesthesiology: ["Complete Subject", "General Anesthesia", "Regional Anesthesia", "Pain Management", "Critical Care", "Emergency Anesthesia", "Pre-Anaesthetic Evaluation", "Local Anaesthetics", "Regional Anaesthesia", "Neuromuscular Blockade", "Anaesthesia for Co-existing Medical Illness", "Perioperative Fluids", "Monitoring in Anaesthesia", "Cardiopulmonary Cerebral Resuscitation", "Anaesthesia Machine", "Oxygen Therapy and Airway", "Mechanical Ventilation and Modes of Ventilation", "Pain Management", "Brain Death"]
};

const difficultyLevels = ["Easy", "Medium", "Hard"];
const questionCounts = ["5", "10", "15", "20", "30", "50", "No Limit"];
const timePerQuestion = ["30", "45", "60", "90", "120", "No Limit"];

export const QuizSetupForm = ({ savedConfigs = [] }: QuizSetupFormProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [specificTopic, setSpecificTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [questionCount, setQuestionCount] = useState<string>("10");
  const [timeLimit, setTimeLimit] = useState<string>("60");
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    if (!selectedSubject) {
      toast.error("Please select a subject");
      return;
    }

    if (selectedSubject !== "Complete MBBS" && !selectedChapter) {
      toast.error("Please select a chapter");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from('quiz_configurations').insert({
          user_id: user.id,
          subject: selectedSubject,
          chapter: selectedChapter,
          topic: specificTopic,
          difficulty,
          question_count: questionCount,
          time_limit: timeLimit
        });

        if (error) throw error;
      }

      // Fix navigation to use the proper route pattern with URL parameters
      const topicParam = specificTopic ? specificTopic : "all";
      const chapterParam = selectedChapter ? selectedChapter : "all";
      
      // Add query parameters for additional options
      const queryParams = new URLSearchParams({
        difficulty: difficulty.toLowerCase(),
        count: questionCount,
        time: timeLimit
      });
      
      navigate(`/quiz/${encodeURIComponent(selectedSubject)}/${encodeURIComponent(chapterParam)}/${encodeURIComponent(topicParam)}?${queryParams.toString()}`);
      
    } catch (error: any) {
      console.error('Error saving configuration:', error);
      toast.error("Failed to save configuration");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-medical-blue">
        NEET PG Quiz Setup
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select onValueChange={setSelectedSubject} value={selectedSubject}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg border-2">
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="chapter">Chapter</Label>
          <Select 
            onValueChange={setSelectedChapter} 
            value={selectedChapter}
            disabled={!selectedSubject || selectedSubject === "Complete MBBS"}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select Chapter" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg border-2">
              {selectedSubject && chapters[selectedSubject as keyof typeof chapters]?.map((chapter) => (
                <SelectItem key={chapter} value={chapter}>
                  {chapter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">Specific Topic (Optional)</Label>
          <Input
            id="topic"
            placeholder="Enter specific topic"
            value={specificTopic}
            onChange={(e) => setSpecificTopic(e.target.value)}
            disabled={!selectedChapter || selectedChapter === "Complete Subject"}
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select onValueChange={setDifficulty} value={difficulty}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg border-2">
              {difficultyLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="questionCount">Number of Questions</Label>
          <Select onValueChange={setQuestionCount} value={questionCount}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select Question Count" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg border-2">
              {questionCounts.map((count) => (
                <SelectItem key={count} value={count}>
                  {count}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeLimit">Time per Question (seconds)</Label>
          <Select onValueChange={setTimeLimit} value={timeLimit}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select Time per Question" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg border-2">
              {timePerQuestion.map((time) => (
                <SelectItem key={time} value={time}>
                  {time} {time !== "No Limit" ? "seconds" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={handleStartQuiz}
          className="relative px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
        >
          <span className="relative z-10">Let's Do</span>
          <div className="absolute inset-0 bg-white opacity-20 transform rotate-12 translate-y-12"></div>
        </button>
      </div>
    </div>
  );
};
