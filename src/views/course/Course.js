import React, { useState, useEffect, useMemo } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CSpinner,
} from '@coreui/react'
import { CSmartTable } from '@coreui/react-pro'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getDepartments } from 'src/apis/department'
import { addCourse, getCourses } from 'src/apis/course'

const Class = () => {
  const [courseData, setCourseData] = useState()
  const [departments, setDepartments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTableLoading, setIsTableLoading] = useState(false)

  useEffect(() => {
    getCourses()
      .then((data) => {
        console.log(data)
        setCourseData(data.results)
      })
      .catch((error) => console.log(error))
    getDepartments()
      .then((data) => {
        console.log(data)
        setDepartments(data.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const columns = [
    {
      key: 'name',
      _style: { width: '30%' },
      _props: { color: 'primary', className: 'fw-semibold' },
    },
    { key: 'yearSection', _style: { width: '20%' } },
    { key: 'department', _style: { width: '20%' } },
  ]

  const year = [
    '2018-1A',
    '2018-1b',
    '2019-1A',
    '2019-1B',
    '2020-1A',
    '2020-1B',
    '2021-1A',
    '2021-1B',
  ]

  const writeCoursedata = async (name, year, departmentId) => {
    try {
      const response = await addCourse(name, year, departmentId)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data, e) => {
    try {
      setIsLoading(true)
      console.log(data)
      const { name, year, departmentId } = data
      await writeCoursedata(name, year, departmentId)
      setIsLoading(false)
      e.target.reset()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Courses</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" noValidate onSubmit={handleSubmit(onSubmit)}>
              <CCol md={6}>
                <CFormInput
                  placeholder="Name"
                  aria-label="Name"
                  {...register('name', { required: 'Please enter course name' })}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                />
                {errors.name && <CFormFeedback invalid>{errors.name?.message}</CFormFeedback>}
              </CCol>
              <CCol md={6}>
                <CFormSelect aria-label="Default select example" {...register('year')}>
                  <option>Select Year</option>
                  {year.map((value, id) => (
                    <option value={value} key={id}>
                      {value}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CFormSelect aria-label="Default select example" {...register('departmentId')}>
                  <option>Select Department</option>
                  {departments.map((dept) => (
                    <option value={dept.id} key={dept.id}>
                      {dept.title}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CButton type="submit">Submit</CButton>
                {isLoading && <CSpinner />}
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard>
          <CCardHeader>Departments</CCardHeader>
          {!isTableLoading ? (
            <CCardBody>
              <CSmartTable
                activePage={1}
                // cleaner
                clickableRows
                columns={columns}
                // columnFilter
                columnSorter
                // footer
                items={courseData}
                // itemsPerPageSelect
                itemsPerPage={5}
                pagination
                sorterValue={{ column: 'title', state: 'asc' }}
                tableHeadProps={{
                  color: 'danger',
                }}
                tableProps={{
                  striped: true,
                  hover: true,
                }}
              />
            </CCardBody>
          ) : (
            <CSpinner />
          )}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Class
