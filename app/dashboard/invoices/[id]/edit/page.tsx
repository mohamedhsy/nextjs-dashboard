import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import Form from "@/app/ui/invoices/edit-form"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata(
  props: { params: Promise<{ id:string }> }
): Promise<Metadata> {
  const {id} = await props.params 
  return {
    title: `Update invoice ${id}`
  }
}

export default async function Page(props: { params: Promise<{ id:string }> }) {
  const params = await props.params
  const id = params.id
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers()
  ])

  if (!invoice) {
    notFound()
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}