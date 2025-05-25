<template>

  <div class="resume-header">
    <h1>Easy Resume</h1>
  </div>

  <div class="resume-form">
    <div class="section-header" @click="toggleSection('basic')">
      <h2>Basic Information</h2>
      <span class="toggle-icon">{{ sectionStates.basic ? '▼' : '▶' }}</span>
    </div>
    <div class="form-section" v-show="sectionStates.basic">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="form.name">
      </div>
      <div class="form-group">
        <label for="phone">Tel</label>
        <input id="phone" type="text" v-model="form.phone">
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input id="email" type="email" v-model="form.email">
      </div>
    </div>

    <div class="section-header" @click="toggleSection('education')">
      <h2>Education</h2>
      <span class="toggle-icon">{{ sectionStates.education ? '▼' : '▶' }}</span>
    </div>
    <div class="form-section" v-show="sectionStates.education">
      <div class="card" v-for="(edu, idx) in form.education" :key="idx">
        <div class="form-row">
          <div class="form-group half">
            <label>School or Institution</label>
            <input type="text" v-model="edu.institution">
          </div>
          <div class="form-group half">
            <label>Location</label>
            <input type="text" v-model="edu.location">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group third">
            <label>Degree</label>
            <input type="text" v-model="edu.degree">
          </div>
          <div class="form-group third">
            <label>Major</label>
            <input type="text" v-model="edu.major">
          </div>
          <div class="form-group sixth">
            <label>GPA</label>
            <input type="text" v-model="edu.GPA">
          </div>
          <div class="form-group sixth">
            <label>Total GPA</label>
            <input type="text" v-model="edu.TotalGPA">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group half">
            <label>Start Time</label>
            <input type="text" v-model="edu.start">
          </div>
          <div class="form-group half">
            <label>End Time</label>
            <input type="text" v-model="edu.end">
          </div>
        </div>
        <button class="btn btn-danger" @click="removeEducation(idx)">Delete</button>
      </div>
      <button class="btn btn-primary" @click="addEducation">Add Education</button>
    </div>

    <div class="section-header" @click="toggleSection('work')">
      <h2>Work Experience</h2>
      <span class="toggle-icon">{{ sectionStates.work ? '▼' : '▶' }}</span>
    </div>
    <div class="form-section" v-show="sectionStates.work">
      <div class="card" v-for="(work, idx) in form.workExperience" :key="idx">
        <div class="form-row">
          <div class="form-group half">
            <label>Company</label>
            <input type="text" v-model="work.company">
          </div>
          <div class="form-group half">
            <label>Location</label>
            <input type="text" v-model="work.location">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group half">
            <label>Position</label>
            <input type="text" v-model="work.position">
          </div>
          <div class="form-group quarter">
            <label>Start Time</label>
            <input type="text" v-model="work.start">
          </div>
          <div class="form-group quarter">
            <label>End Time</label>
            <input type="text" v-model="work.end">
          </div>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="work.detailsStr" rows="3" placeholder="Line break as a new record"></textarea>
        </div>
        <button class="btn btn-danger" @click="removeWork(idx)">Delete</button>
      </div>
      <button class="btn btn-primary" @click="addWork">Add Work Experience</button>
    </div>

    <div class="section-header" @click="toggleSection('projects')">
      <h2>Projects Experience</h2>
      <span class="toggle-icon">{{ sectionStates.projects ? '▼' : '▶' }}</span>
    </div>
    <div class="form-section" v-show="sectionStates.projects">
      <div class="card" v-for="(proj, idx) in form.projects" :key="idx">
        <div class="form-row">
          <div class="form-group half">
            <label>Project Name</label>
            <input type="text" v-model="proj.title">
          </div>
          <div class="form-group half">
            <label>Position</label>
            <input type="text" v-model="proj.position">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group half">
            <label>Start Time</label>
            <input type="text" v-model="proj.start">
          </div>
          <div class="form-group half">
            <label>End Time</label>
            <input type="text" v-model="proj.end">
          </div>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="proj.detailsStr" rows="3" placeholder="Line break as a new record"></textarea>
        </div>
        <button class="btn btn-danger" @click="removeProject(idx)">Delete</button>
      </div>
      <button class="btn btn-primary" @click="addProject">Add Projects Experience</button>
    </div>

    <div class="section-header" @click="toggleSection('skills')">
      <h2>Skills and Honor</h2>
      <span class="toggle-icon">{{ sectionStates.skills ? '▼' : '▶' }}</span>
    </div>
    <div class="form-section" v-show="sectionStates.skills">
      <div class="form-group">
        <label>Language</label>
        <div class="tag-input">
          <input 
            type="text" 
            placeholder="Press Enter to add"
            v-model="newLanguage" 
            @keydown.enter.prevent="addTag('languages')"
          >
          <div class="tags">
            <span class="tag" v-for="(tag, i) in form.skillHonor.languages" :key="i">
              {{ tag }}
              <button class="tag-remove" @click="removeTag('languages', i)">×</button>
            </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Programming Language</label>
        <div class="tag-input">
          <input 
            type="text" 
            placeholder="Press Enter to add"
            v-model="newProgramming" 
            @keydown.enter.prevent="addTag('programming')"
          >
          <div class="tags">
            <span class="tag" v-for="(tag, i) in form.skillHonor.programming" :key="i">
              {{ tag }}
              <button class="tag-remove" @click="removeTag('programming', i)">×</button>
            </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Office Skill</label>
        <div class="tag-input">
          <input 
            type="text" 
            placeholder="Press Enter to add"
            v-model="newOffice" 
            @keydown.enter.prevent="addTag('office')"
          >
          <div class="tags">
            <span class="tag" v-for="(tag, i) in form.skillHonor.office" :key="i">
              {{ tag }}
              <button class="tag-remove" @click="removeTag('office', i)">×</button>
            </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Awards</label>
        <div class="tag-input">
          <input 
            type="text" 
            placeholder="Press Enter to add"
            v-model="newAward" 
            @keydown.enter.prevent="addTag('awards')"
          >
          <div class="tags">
            <span class="tag" v-for="(tag, i) in form.skillHonor.awards" :key="i">
              {{ tag }}
              <button class="tag-remove" @click="removeTag('awards', i)">×</button>
            </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Scholarships</label>
        <div class="tag-input">
          <input 
            type="text" 
            placeholder="Press Enter to add"
            v-model="newScholarship" 
            @keydown.enter.prevent="addTag('scholarships')"
          >
          <div class="tags">
            <span class="tag" v-for="(tag, i) in form.skillHonor.scholarships" :key="i">
              {{ tag }}
              <button class="tag-remove" @click="removeTag('scholarships', i)">×</button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="btn btn-primary" @click="submit">Save</button>
      <button class="btn" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import html2pdf from 'html2pdf.js'
import Handlebars from 'handlebars';


// 区域折叠状态控制
const sectionStates = reactive({
  basic: true,
  education: true,
  work: false,
  projects: false,
  skills: false
})

const toggleSection = (section) => {
  sectionStates[section] = !sectionStates[section]
}

// 用于标签输入的临时变量
const newLanguage = ref('')
const newProgramming = ref('')
const newOffice = ref('')
const newAward = ref('')
const newScholarship = ref('')

const defaultForm = {
  name: '',
  phone: '',
  email: '',
  education: [],
  workExperience: [],
  projects: [],
  skillHonor: {
    languages: [],
    programming: [],
    office: [],
    awards: [],
    scholarships: []
  }
}

const form = reactive(JSON.parse(JSON.stringify(defaultForm)))

// 初始化时加载示例数据
form.name = 'SAN ZHANG'
form.phone = '(+86)15057789234'
form.email = 'zhangsan@outlook.com'
form.education = [
  {
    institution: 'Hangzhou Dianzi University',
    location: 'Hangzhou, China',
    degree: 'Bachelor',
    major: 'Information management and Information System',
    start: 'Aug. 2021',
    end: 'Jun. 2025',
    GPA: 4.6,
    TotalGPA: 5.0
  }
]
form.workExperience = [
  {
    company: 'Morgan Stanley',
    location: 'Shanghai, China',
    position: 'Intern, Data Developer',
    start: 'November 2024',
    end: 'February 2025',
    detailsStr: 'Developed data pipelines using Python and SQL\nWorked with large datasets to extract insights and improve performance'
  }
]
form.projects = [
  {
    title: 'E-commerce Platform',
    position: 'Team Leader',
    start: 'November 2024',
    end: 'February 2025',
    detailsStr: 'Developed and maintained web applications using Vue.js\nResponsible for the front-end architecture and design'
  }
]
form.skillHonor = {
  languages: ['Chinese (Native)', 'English (IELTS 7)'],
  programming: ['Python', 'JavaScript', 'Java', 'C++'],
  office: ['Microsoft Office', 'Excel', 'PowerPoint'],
  awards: ['First Prize in National College Student Programming Contest'],
  scholarships: ['National Scholarship']
}

const addEducation = () => {
  form.education.push({
    institution: '',
    location: '',
    degree: '',
    major: '',
    start: '',
    end: '',
    GPA: '',
    TotalGPA: ''
  })
}
const removeEducation = idx => form.education.splice(idx, 1)

const addWork = () => {
  form.workExperience.push({
    company: '',
    location: '',
    position: '',
    start: '',
    end: '',
    detailsStr: ''
  })
}
const removeWork = idx => form.workExperience.splice(idx, 1)

const addProject = () => {
  form.projects.push({
    title: '',
    position: '',
    start: '',
    end: '',
    detailsStr: ''
  })
}
const removeProject = idx => form.projects.splice(idx, 1)

// 添加标签
const addTag = (type) => {
  const tagMap = {
    'languages': newLanguage,
    'programming': newProgramming,
    'office': newOffice,
    'awards': newAward,
    'scholarships': newScholarship
  }
  
  const value = tagMap[type].value.trim()
  if (value && !form.skillHonor[type].includes(value)) {
    form.skillHonor[type].push(value)
    tagMap[type].value = ''
  }
}

// 移除标签
const removeTag = (type, index) => {
  form.skillHonor[type].splice(index, 1)
}

const exportPDF = async (data) => {
  // 通过 fetch 获取 public/template/template.html 文件内容
  const response = await fetch('/template/template.html');
  const templateSrc = await response.text();

  // 编译模板并渲染数据
  const template = Handlebars.compile(templateSrc);
  const html = template(data);

  const options = {
    margin:       0.5,
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  }
  html2pdf().set(options).from(html).save()
}

const submit = () => {
  // 转换 detailsStr 为数组
  const data = JSON.parse(JSON.stringify(form))
  data.workExperience.forEach(w => {
    w.details = w.detailsStr ? w.detailsStr.split('\n').filter(Boolean) : []
    delete w.detailsStr
  })
  data.projects.forEach(p => {
    p.details = p.detailsStr ? p.detailsStr.split('\n').filter(Boolean) : []
    delete p.detailsStr
  })
  
  // 这里可以发送 data 到后端或保存到本地
  alert('Save success!')
  console.log(JSON.stringify(data, null, 2))
  exportPDF(data) // 如果需要导出 PDF，可以取消注释
}

const reset = () => {
  Object.assign(form, JSON.parse(JSON.stringify(defaultForm)))
}
</script>

<style scoped>
.resume-header{
  text-align: center;
  margin: 20px 0;
}

.resume-form {
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  padding: 32px 40px 24px 40px;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  margin-top: 24px;
  margin-bottom: 16px;
  user-select: none;
  transition: all 0.3s ease;
}

.section-header:hover {
  background-color: #f9f9f9;
  transform: translateX(5px);
  color: #42b983;
}

.toggle-icon {
  font-size: 18px;
  color: #42b983;
  transition: transform 0.3s ease;
}

.form-section {
  margin-bottom: 32px;
  overflow: hidden;
  max-height: 2000px; /* 足够大的高度以容纳内容 */
  opacity: 1;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-section[v-show="false"] {
  max-height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
}

h2 {
  color: #42b983;
  font-weight: 600;
  font-size: 20px;
  margin: 0;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
}

.form-group {
  margin-bottom: 16px;
  width: 100%;
  padding: 0 8px;
  transition: all 0.3s ease;
}

.form-group.half {
  width: 50%;
}

.form-group.third {
  width: 33.3333%;
}

.form-group.quarter {
  width: 25%;
}

.form-group.sixth {
  width: 16.6666%;
}

.card {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  transform-origin: top;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

input:focus, textarea:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
  outline: none;
}

textarea {
  resize: vertical;
}

.btn {
  background: #e0e0e0;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.btn-primary {
  background: #42b983;
  color: white;
}

.btn-primary:hover {
  background: #3aa876;
}

.btn-danger {
  background: #ff6b6b;
  color: white;
}

.btn-danger:hover {
  background: #ff5252;
}

.actions {
  text-align: right;
  margin-top: 32px;
}

.tag-input {
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  padding: 8px;
  background-color: white;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.tag-input:focus-within {
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}

.tag {
  background-color: #e1f5fe;
  border: 1px solid #b3e5fc;
  border-radius: 16px;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  animation: tagAppear 0.3s ease;
}

.tag:hover {
  background-color: #b3e5fc;
}

.tag-remove {
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  margin-left: 4px;
  padding: 0 4px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.tag-remove:hover {
  color: #ff5252;
  transform: scale(1.2);
}

@keyframes tagAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .form-group.half,
  .form-group.third,
  .form-group.quarter,
  .form-group.sixth {
    width: 100%;
  }
  
  .resume-form {
    padding: 16px;
  }
}
</style>
