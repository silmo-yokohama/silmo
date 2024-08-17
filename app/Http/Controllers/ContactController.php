<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
  public function index()
  {
    return Inertia::render('Contact');
  }

  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email|max:255',
      'phone' => 'nullable|string|max:20',
      'category' => 'required|in:制作に関するご相談,外注・業務委託に関するご相談,単価（料金）に関するお問い合わせ,その他',
      'content' => 'required|string',
    ]);

    Contact::create($validatedData);

    return back()->with([
      'success' => 'お問い合わせを受け付けました。'
    ]);
  }

  public function success()
  {
    return Inertia::render('ContactSuccess');
  }
}
